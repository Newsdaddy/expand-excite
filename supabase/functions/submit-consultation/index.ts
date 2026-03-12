import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createHash } from "https://deno.land/std@0.208.0/crypto/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const RATE_LIMIT = {
  maxRequests: 5,
  windowMs: 60 * 60 * 1000, // 1 hour
};

// Email notification recipients
const NOTIFICATION_EMAILS = [
  "editorjin0326@gmail.com",
  "byeongjin.jeong@ecdb.com",
  "byeongjin.jeong05@gmail.com",
];

// Send email notification via Resend API
async function sendEmailNotification(data: {
  name: string;
  company: string;
  email: string;
  phone: string | null;
  message: string;
}) {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured, skipping email notification");
    return;
  }

  const emailContent = `
새로운 상담 신청이 접수되었습니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 상담 신청 정보
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

이름: ${data.name}
회사: ${data.company}
이메일: ${data.email}
연락처: ${data.phone || "미입력"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 문의 내용
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ 접수 시간: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ECDB APAC 블로그 상담 시스템
`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ECDB APAC <onboarding@resend.dev>",
        to: NOTIFICATION_EMAILS,
        subject: `[ECDB 상담] ${data.company} - ${data.name}`,
        text: emailContent,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Failed to send email:", error);
    } else {
      console.log("Email notification sent to:", NOTIFICATION_EMAILS.join(", "));
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

function hashIP(ip: string): string {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + (Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "salt"));
  const hashBuffer = new Uint8Array(32);
  // Use a simple hash for IP anonymization
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash + data[i]) | 0;
  }
  return Math.abs(hash).toString(36);
}

async function checkRateLimit(
  supabase: ReturnType<typeof createClient>,
  ip: string
): Promise<{ allowed: boolean; remaining: number; resetIn: number }> {
  const ipHash = hashIP(ip);
  const now = new Date();
  const windowStart = new Date(now.getTime() - RATE_LIMIT.windowMs);

  // Clean expired entries and get current count in one go
  await supabase
    .from("rate_limits")
    .delete()
    .lt("window_start", windowStart.toISOString());

  const { data: existing } = await supabase
    .from("rate_limits")
    .select("count, window_start")
    .eq("ip_hash", ipHash)
    .single();

  if (!existing) {
    // First request
    await supabase
      .from("rate_limits")
      .insert({ ip_hash: ipHash, count: 1, window_start: now.toISOString() });
    return { allowed: true, remaining: RATE_LIMIT.maxRequests - 1, resetIn: RATE_LIMIT.windowMs };
  }

  if (existing.count >= RATE_LIMIT.maxRequests) {
    const resetTime = new Date(existing.window_start).getTime() + RATE_LIMIT.windowMs;
    return { allowed: false, remaining: 0, resetIn: Math.max(0, resetTime - now.getTime()) };
  }

  // Increment
  await supabase
    .from("rate_limits")
    .update({ count: existing.count + 1 })
    .eq("ip_hash", ipHash);

  const resetTime = new Date(existing.window_start).getTime() + RATE_LIMIT.windowMs;
  return {
    allowed: true,
    remaining: RATE_LIMIT.maxRequests - (existing.count + 1),
    resetIn: Math.max(0, resetTime - now.getTime()),
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
  };
} {
  const errors: string[] = [];

  if (!data || typeof data !== "object") {
    return { valid: false, errors: ["Invalid request body"] };
  }

  const body = data as Record<string, unknown>;

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const phone = typeof body.phone === "string" && body.phone.trim() ? body.phone.trim() : null;

  const utmParamRegex = /^[a-zA-Z0-9_-]*$/;
  const sanitizeUtm = (val: unknown): string | null => {
    if (typeof val !== "string" || !val.trim()) return null;
    const trimmed = val.trim().slice(0, 100);
    return utmParamRegex.test(trimmed) ? trimmed : null;
  };

  const utm_source = sanitizeUtm(body.utm_source);
  const utm_medium = sanitizeUtm(body.utm_medium);
  const utm_campaign = sanitizeUtm(body.utm_campaign);
  const utm_term = sanitizeUtm(body.utm_term);
  const utm_content = sanitizeUtm(body.utm_content);

  if (!name || name.length < 2) errors.push("Name must be at least 2 characters");
  if (name.length > 100) errors.push("Name must be less than 100 characters");
  if (!company || company.length < 2) errors.push("Company must be at least 2 characters");
  if (company.length > 200) errors.push("Company must be less than 200 characters");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email)) errors.push("Please provide a valid email address");
  if (email.length > 255) errors.push("Email must be less than 255 characters");

  if (phone) {
    const phoneRegex = /^[0-9+\-() ]{6,20}$/;
    if (!phoneRegex.test(phone)) errors.push("Please provide a valid phone number");
  }

  if (!message || message.length < 10) errors.push("Message must be at least 10 characters");
  if (message.length > 2000) errors.push("Message must be less than 2000 characters");

  if (errors.length > 0) return { valid: false, errors };

  return {
    valid: true,
    errors: [],
    sanitized: { name, company, email, phone, message, utm_source, utm_medium, utm_campaign, utm_term, utm_content },
  };
}

Deno.serve(async (req) => {
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
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing server configuration");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get client IP for rate limiting
    const clientIP =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    // Database-backed rate limit check
    const rateLimit = await checkRateLimit(supabase, clientIP);

    if (!rateLimit.allowed) {
      const resetMinutes = Math.ceil(rateLimit.resetIn / 60000);
      return new Response(
        JSON.stringify({
          error: "Too many requests",
          message: `Please try again in ${resetMinutes} minutes`,
          retryAfter: Math.ceil(rateLimit.resetIn / 1000),
        }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "X-RateLimit-Remaining": "0",
            "Retry-After": String(Math.ceil(rateLimit.resetIn / 1000)),
          },
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

    // Send email notification (non-blocking)
    sendEmailNotification({
      name: validation.sanitized.name,
      company: validation.sanitized.company,
      email: validation.sanitized.email,
      phone: validation.sanitized.phone,
      message: validation.sanitized.message,
    }).catch((err) => console.error("Email notification failed:", err));

    return new Response(
      JSON.stringify({
        success: true,
        message: "Consultation request submitted successfully",
        id: data.id,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
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
