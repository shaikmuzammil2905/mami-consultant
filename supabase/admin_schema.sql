-- ==============================================================================
-- MAMI CAREER CONSULTANT — COMPREHENSIVE PRODUCTION DATABASE SCHEMA & MIGRATIONS
-- Backend: Supabase PostgreSQL with Row Level Security (RLS) & Realtime Support
-- Target Project: https://abufyigzfbjsfsthscmk.supabase.co
-- ==============================================================================

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------------------------
-- 1. Site Settings (Global Branding, Contacts, Header & Footer Configurations)
-- ------------------------------------------------------------------------------
create table if not exists public.site_settings (
  id text primary key default 'global',
  brand_name text not null default 'MAMI Career Consultant',
  brand_short text not null default 'MAMI',
  tagline text not null default 'Clear Guidance • Proper Documentation • Global Career Support.',
  phone text not null default '+91 9533079819',
  whatsapp text not null default '+91 9533079819',
  email text not null default 'contact@mamiconsultant.com',
  address text not null default 'Rajiv Swagruha Township, Bandlaguda, Nagole, Hyderabad, Telangana, India',
  owner_name text not null default 'Dr. Ramyakrishna Mamidala',
  logo_url text,
  favicon_url text,
  header_cta_text text not null default 'Enquire Now',
  header_cta_link text not null default '/contact',
  announcement_text text default 'DHA & UK HCPC Exam Batches Now Open — Enrol Today for Fast-Track Success',
  announcement_enabled boolean not null default true,
  social_links jsonb not null default '{
    "whatsapp": "https://wa.me/919533079819",
    "instagram": "https://instagram.com/mami_career_consultant",
    "facebook": "https://facebook.com/mamiconsultant",
    "linkedin": "https://linkedin.com/company/mami-career-consultant",
    "youtube": "https://youtube.com/@mamiconsultant"
  }'::jsonb,
  footer_text text not null default 'MAMI Career Consultant empowers healthcare professionals across India with genuine, transparent international licensing, exam preparation, verification, and recruitment services.',
  updated_at timestamptz not null default now()
);

-- Seed initial global settings if empty
insert into public.site_settings (id)
values ('global')
on conflict (id) do nothing;

-- ------------------------------------------------------------------------------
-- 2. Website Sections (Hero, About, Why Choose Us, Global Opps, CTAs)
-- ------------------------------------------------------------------------------
create table if not exists public.website_sections (
  section_id text primary key,
  title text not null,
  subtitle text,
  description text,
  badge text,
  image_url text,
  background_url text,
  cta_primary_text text,
  cta_primary_link text,
  cta_secondary_text text,
  cta_secondary_link text,
  extra_data jsonb not null default '{}'::jsonb,
  is_visible boolean not null default true,
  updated_at timestamptz not null default now()
);

-- Seed initial hero & primary sections
insert into public.website_sections (section_id, title, subtitle, description, badge, cta_primary_text, cta_primary_link, cta_secondary_text, cta_secondary_link, extra_data)
values 
(
  'hero',
  'Navigate Your Global Healthcare Career with Absolute Confidence',
  'Clear Guidance • Proper Documentation • Global Career Support.',
  'Empowering Doctors, Nurses, Physiotherapists & Allied Healthcare Professionals to achieve DHA, DOH, MOH, SCFHS, UK HCPC & Ireland licensure with complete transparency.',
  'Premier Healthcare Career Consultancy',
  'Explore Licensing Pathways',
  '/services/healthcare-licensing',
  'Speak with Our Founder',
  '/why-choose-us',
  '{"stats": [{"value": "12+", "label": "Years Experience"}, {"value": "100%", "label": "Dedicated Guidance"}, {"value": "7+", "label": "Global Destinations"}]}'::jsonb
),
(
  'about',
  'Your Trusted Bridge to International Healthcare Systems',
  'Empowering Healthcare Ambitions with Ethics and Transparency',
  'Founded by Senior Neuro Physiotherapist & UK Gold Medalist Dr. Ramyakrishna Mamidala, MAMI Career Consultant was built on firsthand international experience to solve the documentation, exam preparation, and licensing bottlenecks that healthcare professionals face.',
  'About MAMI Career Consultant',
  'Learn More About Our Journey',
  '/why-choose-us',
  'Book Founder Consultation',
  '/contact',
  '{}'::jsonb
),
(
  'why_choose_us',
  'Why Healthcare Professionals Trust MAMI Career Consultant',
  'Direct Guidance from an International Healthcare Practitioner',
  'Unlike generic recruitment consultancies, MAMI is led by a licensed healthcare professional who has cleared international regulatory boards and genuinely understands your clinical credentialing.',
  'Proven Track Record & Trust',
  'Meet Our Founder',
  '/why-choose-us',
  'Apply for Jobs',
  '/career',
  '{}'::jsonb
)
on conflict (section_id) do nothing;

-- ------------------------------------------------------------------------------
-- 3. Services Table (Comprehensive Support for 7 Core Services & Custom Offerings)
-- ------------------------------------------------------------------------------
create table if not exists public.services (
  id text primary key,
  title text not null,
  short_subtitle text not null,
  short_description text not null,
  detailed_description text not null,
  icon_name text not null default 'ShieldPlus',
  image_url text,
  route text not null,
  pricing_note text,
  benefits jsonb not null default '[]'::jsonb,
  process jsonb not null default '[]'::jsonb,
  eligibility jsonb not null default '[]'::jsonb,
  required_documents jsonb not null default '[]'::jsonb,
  authorities jsonb not null default '[]'::jsonb,
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Seed all 7 core services
insert into public.services (id, title, short_subtitle, short_description, detailed_description, icon_name, route, display_order, is_published, authorities)
values
(
  'healthcare-licensing',
  'Healthcare Licensing Services',
  'DHA, DOH, MOH, SCFHS & more',
  'End-to-end healthcare licensing support for DHA Dubai, DOH Abu Dhabi, MOH UAE, SCFHS Saudi, Oman Prometric, Qatar, UK & Ireland.',
  'Navigating international healthcare licensing requires precision, up-to-date regulatory knowledge, and error-free documentation. MAMI Career Consultant provides dedicated licensing guidance for doctors, nurses, physiotherapists, and allied healthcare professionals across the UAE, GCC, UK, and Ireland.',
  'ShieldPlus',
  '/services/healthcare-licensing',
  1,
  true,
  '["DHA – Dubai", "DOH / HAAD – Abu Dhabi", "MOH – UAE", "SCFHS – Saudi Arabia", "Oman Prometric", "Qatar DHP", "UK & Ireland"]'::jsonb
),
(
  'international-registration',
  'International Registration Support',
  'UK, Ireland & Global Guidance',
  'Structured global registration guidance across UK, Ireland, UAE, Saudi Arabia, Oman, Qatar, and other GCC destinations.',
  'Every destination country maintains distinct professional registration boards, credential evaluation rules, and language requirements. We build a clear country-specific roadmap so you can pursue international registration smoothly without costly rejections or delays.',
  'Globe',
  '/services/international-registration',
  2,
  true,
  '["UK (GMC / NMC / HCPC)", "Ireland (NMBI / CORU)", "UAE (DHA / DOH / MOH)", "Saudi Arabia (SCFHS)", "Qatar (DHP)", "Oman (OMSB)"]'::jsonb
),
(
  'online-training',
  'Online Training & Exam Preparation',
  'DHA, DOH, MOH & GCC Prometric',
  'Specialized coaching for DHA, DOH, MOH, SCFHS Prometric exams, CBT, and language proficiencies by experienced mentors.',
  'Comprehensive subject reviews, updated high-yield question banks, interactive weekend sessions, and exam-taking strategies tailored for clinical professionals.',
  'GraduationCap',
  '/services/training',
  3,
  true,
  '["DHA Exam", "DOH Pearson VUE", "MOH Exam", "Saudi Prometric", "Oman OMSB", "Qatar QCHP"]'::jsonb
),
(
  'mock-tests',
  'Mock Tests & Interview Preparation',
  'Practice. Prepare. Excel.',
  'Simulated Prometric CBT mock exams with timed scoring, rationales, and mock clinical interview practice for global hospitals.',
  'Experience actual exam screen layouts, learn time-management techniques, and gain clinical interview confidence with hospital interview mock sessions.',
  'ClipboardCheck',
  '/services/training#mock-tests',
  4,
  true,
  '["Computer Based Testing (CBT)", "Clinical Case Scenarios", "Hospital HR & Clinical Viva"]'::jsonb
),
(
  'international-recruitment',
  'International Recruitment / Job Assistance',
  'UAE, GCC & Beyond',
  'Direct connections with reputed hospitals, medical centres, rehabilitation clinics, and healthcare groups in UAE and GCC.',
  'CV formatting to international healthcare standards, interview scheduling with partner healthcare providers, and onboarding guidance.',
  'Briefcase',
  '/services/recruitment',
  5,
  true,
  '["Government Hospitals", "Private Hospital Networks", "Specialty Clinics", "Rehab Centers"]'::jsonb
),
(
  'documentation-verification',
  'Documentation & Verification Support',
  'Complete Assistance',
  'Hassle-free DataFlow Primary Source Verification (PSV), HRD attestation, MEA apostille, and Embassy attestation handling.',
  'Thorough pre-audit of all degree certificates, transcripts, registration certificates, and experience letters to prevent DataFlow discrepancies.',
  'FileCheck',
  '/services/documentation',
  6,
  true,
  '["DataFlow Group", "MEA Apostille", "State HRD", "UAE & GCC Embassies"]'::jsonb
),
(
  'career-counselling',
  'Career Counselling',
  'Plan Your Global Career',
  'Personalized 1-on-1 career mapping to choose the right country, licensing route, and timeline based on your clinical profile.',
  'Direct consultation with Dr. Ramyakrishna Mamidala and senior career consultants to evaluate your credentials, budget, timeline, and family relocation goals.',
  'Users',
  '/services/career-counselling',
  7,
  true,
  '["Doctors (MBBS/MD)", "Nurses (BSc/GNM)", "Physiotherapists (BPT/MPT)", "Allied Healthcare"]'::jsonb
)
on conflict (id) do nothing;

-- ------------------------------------------------------------------------------
-- 4. Job Listings (International & Domestic Healthcare Openings)
-- ------------------------------------------------------------------------------
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

-- Seed initial vacancies
insert into public.job_listings (id, title, profession, description, location, country, experience, qualification, employment_type, authority, status)
values
(
  'job-pt-dubai-01',
  'Senior Neuro Physiotherapist',
  'Physiotherapist',
  'Leading tertiary rehabilitation hospital in Dubai seeks an experienced Neuro Physiotherapist with DHA Eligibility or License.',
  'Dubai, UAE',
  'UAE',
  '3–6 Years',
  'BPT / MPT (Neurology preferred)',
  'Full-Time',
  'DHA Dubai',
  'active'
),
(
  'job-icu-nurse-abudhabi-02',
  'Critical Care / ICU Staff Nurse',
  'Nurse',
  'Premium JCI-accredited hospital in Abu Dhabi hiring ICU Nurses with DOH/HAAD License or Pearson VUE pass.',
  'Abu Dhabi, UAE',
  'UAE',
  '2–5 Years in ICU / CCU',
  'B.Sc Nursing',
  'Full-Time',
  'DOH Abu Dhabi',
  'active'
),
(
  'job-gp-saudi-03',
  'General Practitioner (GP)',
  'Doctor',
  'Reputed medical polyclinic chain in Riyadh requires General Practitioners with SCFHS classification or readiness.',
  'Riyadh, Saudi Arabia',
  'Saudi Arabia',
  '2+ Years Post-Internship',
  'MBBS',
  'Full-Time',
  'SCFHS Saudi Arabia',
  'active'
),
(
  'job-pt-uk-04',
  'Band 6 MSK Physiotherapist',
  'Physiotherapist',
  'NHS Trust partnership clinic in the United Kingdom looking for HCPC registered physiotherapists.',
  'Birmingham, United Kingdom',
  'United Kingdom',
  '2+ Years',
  'BPT / MPT',
  'Full-Time',
  'UK HCPC',
  'active'
)
on conflict (id) do nothing;

-- ------------------------------------------------------------------------------
-- 5. Testimonials & Success Stories
-- ------------------------------------------------------------------------------
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  qualification text,
  role text,
  location text not null default 'Dubai, UAE',
  rating integer not null default 5 check (rating >= 1 and rating <= 5),
  quote text not null,
  full_story text,
  avatar_url text,
  is_featured boolean not null default true,
  is_published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Seed initial client testimonials
insert into public.testimonials (name, qualification, role, location, rating, quote, display_order)
values
(
  'Dr. Priya Sharma',
  'MBBS, DGO',
  'Specialist Obstetrician',
  'Dubai, UAE (DHA Licensed)',
  5,
  'MAMI Career Consultant handled my DHA Sheryan application and DataFlow verification flawlessly. Dr. Ramyakrishna personally guided me through the syllabus and Prometric schedule. Within 6 weeks, I had my DHA Eligibility Letter in hand!',
  1
),
(
  'Anjali Nair',
  'B.Sc Nursing',
  'Staff Nurse',
  'Abu Dhabi (DOH Licensed)',
  5,
  'I was confused about DOH Pearson VUE versus DHA Prometric. The team at MAMI mapped out every single step, verified my experience certificates, and gave me targeted mock questions. Truly transparent and zero false promises.',
  2
),
(
  'Ramesh Babu',
  'MPT (Neuro)',
  'Senior Physiotherapist',
  'United Kingdom (HCPC Registered)',
  5,
  'Getting HCPC registration in the UK seemed impossible until I spoke to Dr. Ramyakrishna. As a fellow physiotherapist and UK Gold Medalist, her advice on the Statement of Practice and course mapping was spot on!',
  3
);

-- ------------------------------------------------------------------------------
-- 6. Contact Inquiries & General Leads
-- ------------------------------------------------------------------------------
create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  profession text,
  service_interest text,
  country_interest text,
  message text,
  source_page text not null default 'contact',
  status text not null default 'New' check (
    status in ('New', 'Contacted', 'In Progress', 'Converted', 'Closed')
  ),
  admin_notes text,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------------------------
-- 7. Career Applications (with Candidate CV details)
-- ------------------------------------------------------------------------------
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

-- ------------------------------------------------------------------------------
-- 8. Collaboration Requirements (Hospital & Employer Requests)
-- ------------------------------------------------------------------------------
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

-- ------------------------------------------------------------------------------
-- 9. Media Assets Library (Cloudinary & Local Assets Records)
-- ------------------------------------------------------------------------------
create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  public_id text,
  url text not null,
  format text,
  size_bytes bigint,
  folder text not null default 'general',
  uploaded_by text not null default 'admin',
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------------------------
-- 10. Enable Row Level Security (RLS) on all tables
-- ------------------------------------------------------------------------------
alter table public.site_settings enable row level security;
alter table public.website_sections enable row level security;
alter table public.services enable row level security;
alter table public.job_listings enable row level security;
alter table public.testimonials enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.career_applications enable row level security;
alter table public.collaboration_requirements enable row level security;
alter table public.media_assets enable row level security;

-- ------------------------------------------------------------------------------
-- 11. Security Policies (Permissive Access for CMS Administration & Public Visitors)
-- ------------------------------------------------------------------------------

-- Site Settings
drop policy if exists "Public read site_settings" on public.site_settings;
drop policy if exists "Admin all site_settings" on public.site_settings;
create policy "Permissive site_settings" on public.site_settings for all using (true) with check (true);

-- Website Sections
drop policy if exists "Public read website_sections" on public.website_sections;
drop policy if exists "Admin all website_sections" on public.website_sections;
create policy "Permissive website_sections" on public.website_sections for all using (true) with check (true);

-- Services
drop policy if exists "Public read published services" on public.services;
drop policy if exists "Admin all services" on public.services;
create policy "Permissive services" on public.services for all using (true) with check (true);

-- Job Listings
drop policy if exists "Public read non-draft job listings" on public.job_listings;
drop policy if exists "Admin all job listings" on public.job_listings;
create policy "Permissive job_listings" on public.job_listings for all using (true) with check (true);

-- Testimonials
drop policy if exists "Public read published testimonials" on public.testimonials;
drop policy if exists "Admin all testimonials" on public.testimonials;
create policy "Permissive testimonials" on public.testimonials for all using (true) with check (true);

-- Contact Inquiries
drop policy if exists "Public insert contact_inquiries" on public.contact_inquiries;
drop policy if exists "Admin all contact_inquiries" on public.contact_inquiries;
create policy "Permissive contact_inquiries" on public.contact_inquiries for all using (true) with check (true);

-- Career Applications
drop policy if exists "Public insert career_applications" on public.career_applications;
drop policy if exists "Admin all career_applications" on public.career_applications;
create policy "Permissive career_applications" on public.career_applications for all using (true) with check (true);

-- Collaboration Requirements
drop policy if exists "Public insert collaboration_requirements" on public.collaboration_requirements;
drop policy if exists "Admin all collaboration_requirements" on public.collaboration_requirements;
create policy "Permissive collaboration_requirements" on public.collaboration_requirements for all using (true) with check (true);

-- Media Assets
drop policy if exists "Public read media_assets" on public.media_assets;
drop policy if exists "Admin all media_assets" on public.media_assets;
create policy "Permissive media_assets" on public.media_assets for all using (true) with check (true);

grant all on table public.services to anon, authenticated, service_role;
grant all on table public.job_listings to anon, authenticated, service_role;
grant all on table public.website_sections to anon, authenticated, service_role;
grant all on table public.site_settings to anon, authenticated, service_role;
grant all on table public.testimonials to anon, authenticated, service_role;
grant all on table public.media_assets to anon, authenticated, service_role;
grant all on table public.contact_inquiries to anon, authenticated, service_role;
grant all on table public.career_applications to anon, authenticated, service_role;
grant all on table public.collaboration_requirements to anon, authenticated, service_role;

-- ------------------------------------------------------------------------------
-- 12. Realtime Enablement (for instant synchronization without manual reloads)
-- ------------------------------------------------------------------------------
alter publication supabase_realtime add table public.site_settings;
alter publication supabase_realtime add table public.website_sections;
alter publication supabase_realtime add table public.services;
alter publication supabase_realtime add table public.job_listings;
alter publication supabase_realtime add table public.testimonials;
alter publication supabase_realtime add table public.contact_inquiries;
alter publication supabase_realtime add table public.career_applications;
alter publication supabase_realtime add table public.collaboration_requirements;
alter publication supabase_realtime add table public.media_assets;

