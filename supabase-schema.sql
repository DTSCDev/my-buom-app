-- Supabase Database Schema for BUOM App
-- Run this in your Supabase project: Dashboard → SQL Editor → New Query

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create members table (user profile data)
CREATE TABLE IF NOT EXISTS public.members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    date_of_birth DATE,
    annual_salary DECIMAL(12,2),
    current_pension_value DECIMAL(12,2),
    target_retirement_age INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table (for assets and liabilities)
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('asset', 'liability')),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create assets table
CREATE TABLE IF NOT EXISTS public.assets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES public.members(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.categories(id),
    name TEXT NOT NULL,
    value DECIMAL(12,2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create liabilities table
CREATE TABLE IF NOT EXISTS public.liabilities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES public.members(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.categories(id),
    name TEXT NOT NULL,
    value DECIMAL(12,2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create APF registrations table
CREATE TABLE IF NOT EXISTS public.apf_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES public.members(id) ON DELETE CASCADE,
    annual_income DECIMAL(12,2) NOT NULL,
    existing_pension_value DECIMAL(12,2) NOT NULL,
    target_retirement_age INTEGER NOT NULL,
    shortfall_amount DECIMAL(12,2) NOT NULL,
    apf_funding_required DECIMAL(12,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO public.categories (name, type, description) VALUES
('Property', 'asset', 'Real estate and property investments'),
('Investments', 'asset', 'Stocks, bonds, and investment accounts'),
('Savings', 'asset', 'Savings accounts and cash deposits'),
('Pension', 'asset', 'Pension funds and retirement accounts'),
('Mortgage', 'liability', 'Property mortgages and loans'),
('Credit Cards', 'liability', 'Credit card debts'),
('Personal Loans', 'liability', 'Personal loans and borrowing'),
('Other Debts', 'liability', 'Other forms of debt')
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.liabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.apf_registrations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Members: Users can only see their own data
CREATE POLICY "Users can view own member data" ON public.members
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own member data" ON public.members
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own member data" ON public.members
    FOR UPDATE USING (auth.uid() = user_id);

-- Assets: Users can only see their own assets
CREATE POLICY "Users can view own assets" ON public.assets
    FOR SELECT USING (
        member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can insert own assets" ON public.assets
    FOR INSERT WITH CHECK (
        member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can update own assets" ON public.assets
    FOR UPDATE USING (
        member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can delete own assets" ON public.assets
    FOR DELETE USING (
        member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid())
    );

-- Liabilities: Users can only see their own liabilities
CREATE POLICY "Users can view own liabilities" ON public.liabilities
    FOR SELECT USING (
        member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can insert own liabilities" ON public.liabilities
    FOR INSERT WITH CHECK (
        member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can update own liabilities" ON public.liabilities
    FOR UPDATE USING (
        member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can delete own liabilities" ON public.liabilities
    FOR DELETE USING (
        member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid())
    );

-- APF Registrations: Users can only see their own registrations
CREATE POLICY "Users can view own apf registrations" ON public.apf_registrations
    FOR SELECT USING (
        member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can insert own apf registrations" ON public.apf_registrations
    FOR INSERT WITH CHECK (
        member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can update own apf registrations" ON public.apf_registrations
    FOR UPDATE USING (
        member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid())
    );

-- Categories: All users can read categories
CREATE POLICY "Anyone can view categories" ON public.categories
    FOR SELECT USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON public.members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assets_updated_at BEFORE UPDATE ON public.assets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_liabilities_updated_at BEFORE UPDATE ON public.liabilities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_apf_registrations_updated_at BEFORE UPDATE ON public.apf_registrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
