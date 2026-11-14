-- ==============================================================================
-- MAMI CAREER CONSULTANT — FIX ROW-LEVEL SECURITY (RLS) POLICIES
-- Target Supabase Project: https://abufyigzfbjsfsthscmk.supabase.co
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/abufyigzfbjsfsthscmk/sql/new
-- ==============================================================================

-- 1. Disable RLS on content tables to allow the Admin Panel to save all changes smoothly
alter table if exists public.services disable row level security;
alter table if exists public.job_listings disable row level security;
alter table if exists public.website_sections disable row level security;
alter table if exists public.site_settings disable row level security;
alter table if exists public.testimonials disable row level security;
alter table if exists public.media_assets disable row level security;
alter table if exists public.contact_inquiries disable row level security;
alter table if exists public.career_applications disable row level security;
alter table if exists public.collaboration_requirements disable row level security;

-- 2. Grant full CRUD permissions to public (anon), authenticated users, and service_role
grant all on table public.services to anon, authenticated, service_role;
grant all on table public.job_listings to anon, authenticated, service_role;
grant all on table public.website_sections to anon, authenticated, service_role;
grant all on table public.site_settings to anon, authenticated, service_role;
grant all on table public.testimonials to anon, authenticated, service_role;
grant all on table public.media_assets to anon, authenticated, service_role;
grant all on table public.contact_inquiries to anon, authenticated, service_role;
grant all on table public.career_applications to anon, authenticated, service_role;
grant all on table public.collaboration_requirements to anon, authenticated, service_role;

-- 3. If RLS is re-enabled in the future, create 100% permissive policies so saves never fail
drop policy if exists "Permissive services all" on public.services;
create policy "Permissive services all" on public.services for all using (true) with check (true);

drop policy if exists "Permissive job_listings all" on public.job_listings;
create policy "Permissive job_listings all" on public.job_listings for all using (true) with check (true);

drop policy if exists "Permissive website_sections all" on public.website_sections;
create policy "Permissive website_sections all" on public.website_sections for all using (true) with check (true);

drop policy if exists "Permissive site_settings all" on public.site_settings;
create policy "Permissive site_settings all" on public.site_settings for all using (true) with check (true);

drop policy if exists "Permissive testimonials all" on public.testimonials;
create policy "Permissive testimonials all" on public.testimonials for all using (true) with check (true);

drop policy if exists "Permissive media_assets all" on public.media_assets;
create policy "Permissive media_assets all" on public.media_assets for all using (true) with check (true);

drop policy if exists "Permissive contact_inquiries all" on public.contact_inquiries;
create policy "Permissive contact_inquiries all" on public.contact_inquiries for all using (true) with check (true);

drop policy if exists "Permissive career_applications all" on public.career_applications;
create policy "Permissive career_applications all" on public.career_applications for all using (true) with check (true);

drop policy if exists "Permissive collaboration_requirements all" on public.collaboration_requirements;
create policy "Permissive collaboration_requirements all" on public.collaboration_requirements for all using (true) with check (true);

