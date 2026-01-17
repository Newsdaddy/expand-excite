-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'sales', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role = _role
    )
$$;

-- Create function to check if user has any staff role (admin or sales)
CREATE OR REPLACE FUNCTION public.is_staff(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role IN ('admin', 'sales')
    )
$$;

-- RLS policy for user_roles: only admins can view/manage roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Drop existing permissive policies on consultation_requests
DROP POLICY IF EXISTS "Authenticated users can view consultation requests" ON public.consultation_requests;
DROP POLICY IF EXISTS "Authenticated users can update consultation requests" ON public.consultation_requests;

-- Create restrictive policies: only staff (admin/sales) can view and update
CREATE POLICY "Staff can view consultation requests"
ON public.consultation_requests
FOR SELECT
TO authenticated
USING (public.is_staff(auth.uid()));

CREATE POLICY "Staff can update consultation requests"
ON public.consultation_requests
FOR UPDATE
TO authenticated
USING (public.is_staff(auth.uid()));

CREATE POLICY "Admins can delete consultation requests"
ON public.consultation_requests
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));