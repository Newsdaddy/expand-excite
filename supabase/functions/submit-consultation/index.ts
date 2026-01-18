import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// In-memory rate limit store (resets on function cold start, but provides protection during active periods)
// For production at scale, consider using Redis or a database table
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = {
  maxRequests: 5,          // Max requests per window
  windowMs: 60 * 60 * 1000, // 1 hour window
};

function getRateLimitKey(ip: string): string {
  return `rate_limit:${ip}`;
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const key = getRateLimitKey(ip);
  const record = rateLimitStore.get(key);

  // Clean up expired entries
  if (record && now > record.resetTime) {
    rateLimitStore.delete(key);
  }

  const currentRecord = rateLimitStore.get(key);

  if (!currentRecord) {
    // First request from this IP
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    });
    return { allowed: true, remaining: RATE_LIMIT.maxRequests - 1, resetIn: RATE_LIMIT.windowMs };
  }

  if (currentRecord.count >= RATE_LIMIT.maxRequests) {
    return { 
      allowed: false, 
      remaining: 0, 
      resetIn: currentRecord.resetTime - now 
    };
  }

  // Increment count
  currentRecord.count++;
  rateLimitStore.set(key, currentRecord);

  return { 
    allowed: true, 
    remaining: RATE_LIMIT.maxRequests - currentRecord.count, 
    resetIn: currentRecord.resetTime - now 
  };
}

// Input validation
function validateInput(data: unknown): { 
  valid: boolean; 
  errors: string[]; 
  sanitized?: {
    name: string;
    company: string;
    email: string;
    phone: string | null;
    message: string;
    utm_source: string | null;
    utm_medium: string | null;
    utm_campaign: string | null;
    utm_term: string | null;
    utm_content: string | null;
  } 
} {
  const errors: string[] = [];
  
  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Invalid request body'] };
  }

  const body = data as Record<string, unknown>;

  // Required fields
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const company = typeof body.company === 'string' ? body.company.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  
  // Optional fields
  const phone = typeof body.phone === 'string' && body.phone.trim() ? body.phone.trim() : null;
  
  // UTM params (optional)
  const utmParamRegex = /^[a-zA-Z0-9_-]*$/;
  const sanitizeUtm = (val: unknown): string | null => {
    if (typeof val !== 'string' || !val.trim()) return null;
    const trimmed = val.trim().slice(0, 100);
    return utmParamRegex.test(trimmed) ? trimmed : null;
  };

  const utm_source = sanitizeUtm(body.utm_source);
  const utm_medium = sanitizeUtm(body.utm_medium);
  const utm_campaign = sanitizeUtm(body.utm_campaign);
  const utm_term = sanitizeUtm(body.utm_term);
  const utm_content = sanitizeUtm(body.utm_content);

  // Validation rules
  if (!name || name.length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  if (name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }

  if (!company || company.length < 2) {
    errors.push('Company must be at least 2 characters');
  }
  if (company.length > 200) {
    errors.push('Company must be less than 200 characters');
  }

  // Email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Please provide a valid email address');
  }
  if (email.length > 255) {
    errors.push('Email must be less than 255 characters');
  }

  // Phone validation (optional)
  if (phone) {
    const phoneRegex = /^[0-9+\-() ]{6,20}$/;
    if (!phoneRegex.test(phone)) {
      errors.push('Please provide a valid phone number');
    }
  }

  if (!message || message.length < 10) {
    errors.push('Message must be at least 10 characters');
  }
  if (message.length > 2000) {
    errors.push('Message must be less than 2000 characters');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    sanitized: {
      name,
      company,
      email,
      phone,
      message,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
    },
  };
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";

    // Check rate limit
    const rateLimit = checkRateLimit(clientIP);
    
    if (!rateLimit.allowed) {
      const resetMinutes = Math.ceil(rateLimit.resetIn / 60000);
      return new Response(
        JSON.stringify({ 
          error: "Too many requests",
          message: `Please try again in ${resetMinutes} minutes`,
          retryAfter: Math.ceil(rateLimit.resetIn / 1000)
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetIn / 1000)),
            "Retry-After": String(Math.ceil(rateLimit.resetIn / 1000))
          } 
        }
      );
    }

    // Parse and validate input
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validation = validateInput(body);
    if (!validation.valid || !validation.sanitized) {
      return new Response(
        JSON.stringify({ error: "Validation failed", details: validation.errors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role key for inserting
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase configuration");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert consultation request
    const { data, error } = await supabase
      .from("consultation_requests")
      .insert({
        name: validation.sanitized.name,
        company: validation.sanitized.company,
        email: validation.sanitized.email,
        phone: validation.sanitized.phone,
        message: validation.sanitized.message,
        source: "landing_page",
        utm_source: validation.sanitized.utm_source,
        utm_medium: validation.sanitized.utm_medium,
        utm_campaign: validation.sanitized.utm_campaign,
        utm_term: validation.sanitized.utm_term,
        utm_content: validation.sanitized.utm_content,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Database error:", error.message);
      return new Response(
        JSON.stringify({ error: "Failed to submit request" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Consultation request submitted successfully",
        id: data.id 
      }),
      { 
        status: 200, 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json",
          "X-RateLimit-Remaining": String(rateLimit.remaining)
        } 
      }
    );

  } catch (error) {
    console.error("Unexpected error:", error instanceof Error ? error.message : "Unknown error");
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
