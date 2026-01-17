-- Create enum for consultation request status
CREATE TYPE public.consultation_status AS ENUM ('pending', 'contacted', 'converted', 'rejected');

-- Create consultation_requests table
CREATE TABLE public.consultation_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    status public.consultation_status NOT NULL DEFAULT 'pending',
    source TEXT DEFAULT 'landing_page',
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_term TEXT,
    utm_content TEXT,
    assigned_to UUID,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting (anyone can submit a consultation request)
CREATE POLICY "Anyone can submit consultation requests"
ON public.consultation_requests
FOR INSERT
WITH CHECK (true);

-- Create policy for selecting (only authenticated users can view)
CREATE POLICY "Authenticated users can view consultation requests"
ON public.consultation_requests
FOR SELECT
TO authenticated
USING (true);

-- Create policy for updating (only authenticated users can update)
CREATE POLICY "Authenticated users can update consultation requests"
ON public.consultation_requests
FOR UPDATE
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_consultation_requests_updated_at
BEFORE UPDATE ON public.consultation_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_consultation_requests_status ON public.consultation_requests(status);
CREATE INDEX idx_consultation_requests_created_at ON public.consultation_requests(created_at DESC);
CREATE INDEX idx_consultation_requests_email ON public.consultation_requests(email);