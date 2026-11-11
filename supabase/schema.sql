-- MAMI Career Consultant — Admin-Ready Relational Schema (PostgreSQL / Supabase)
-- Run in Supabase SQL Editor to provision production storage & RLS policies.

create extension if not exists "pgcrypto";

-- 1. Job Listings Table
create table if not exists public.job_listings (
  id text primary key,
  title text not null,
  profession text not null,
  description text not null,
  full_description text,
  location text not null,
  country text not null,
  experience text not null,
  qualification text,
  employment_type text not null default 'Full-Time',
  authority text,
  requirements jsonb not null default '[]'::jsonb,
  responsibilities jsonb not null default '[]'::jsonb,
  benefits jsonb not null default '[]'::jsonb,
  status text not null default 'active' check (status in ('active', 'closed', 'draft')),
  created_date timestamptz not null default now(),
  closing_date timestamptz
);

-- 2. Career Applications Table
create table if not exists public.career_applications (
  id uuid primary key default gen_random_uuid(),
  application_ref text not null unique,
  job_id text references public.job_listings(id) on delete set null,
  applied_job text not null,
  full_name text not null,
  mobile text not null,
  email text not null,
  city text not null,
  profession text not null,
  job_type text not null,
  experience text not null,
  preferred_location text not null,
  qualification text not null,
  current_organization text,
  resume_filename text,
  resume_mime_type text,
  resume_size_bytes integer,
  resume_storage_path text,
  message text,
  status text not null default 'New' check (
    status in ('New', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Selected', 'Rejected', 'Closed')
  ),
  admin_notes text,
  created_at timestamptz not null default now()
);

-- 3. Collaboration / Employer Requirements Table
create table if not exists public.collaboration_requirements (
  id uuid primary key default gen_random_uuid(),
  requirement_ref text not null unique,
  organization_name text not null,
  contact_person text not null,
  designation text not null,
  email text not null,
  mobile text not null,
  location text not null,
  organization_type text not null,
  people_required integer not null check (people_required >= 1),
  employee_types jsonb not null default '[]'::jsonb,
  job_position text not null,
  qualification text not null,
  experience text not null,
  preferred_location text not null,
  joining_timeline text not null,
  additional_requirements text,
  status text not null default 'New' check (
    status in (
      'New',
      'Under Review',
      'Contacted',
      'Requirement Confirmed',
      'Profiles Shared',
      'Interview Stage',
      'Position Filled',
      'Closed'
    )
  ),
  admin_notes text,
  created_at timestamptz not null default now()
);

-- Security & Privacy: Enable Row Level Security
alter table public.job_listings enable row level security;
alter table public.career_applications enable row level security;
alter table public.collaboration_requirements enable row level security;

-- Public can read active & closed job listings (not drafts)
create policy "Public read non-draft job listings"
  on public.job_listings for select
  using (status in ('active', 'closed'));

-- Public can submit applications and requirements, but CANNOT read any private submissions
create policy "Public insert career applications"
  on public.career_applications for insert
  with check (true);

create policy "Public insert collaboration requirements"
  on public.collaboration_requirements for insert
  with check (true);

