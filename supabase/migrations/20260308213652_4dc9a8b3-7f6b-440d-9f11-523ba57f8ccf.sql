-- Fix consultation_requests: drop RESTRICTIVE policies and recreate as PERMISSIVE

DROP POLICY IF EXISTS "Anyone can submit consultation requests" ON public.consultation_requests;
DROP POLICY IF EXISTS "Staff can view consultation requests" ON public.consultation_requests;
DROP POLICY IF EXISTS "Staff can update consultation requests" ON public.consultation_requests;
DROP POLICY IF EXISTS "Admins can delete consultation requests" ON public.consultation_requests;

CREATE POLICY "Anyone can submit consultation requests"
  ON public.consultation_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Staff can view consultation requests"
  ON public.consultation_requests
  FOR SELECT
  TO authenticated
  USING (is_staff(auth.uid()));

CREATE POLICY "Staff can update consultation requests"
  ON public.consultation_requests
  FOR UPDATE
  TO authenticated
  USING (is_staff(auth.uid()));

CREATE POLICY "Admins can delete consultation requests"
  ON public.consultation_requests
  FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix user_roles: drop RESTRICTIVE policies and recreate as PERMISSIVE

DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;

CREATE POLICY "Admins can manage roles"
  ON public.user_roles
  FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view all roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create rate_limits table for persistent rate limiting

CREATE TABLE IF NOT EXISTS public.rate_limits (
  ip_hash TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- No RLS policies needed - only accessed via service role in edge function