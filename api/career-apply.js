// Serverless endpoint for Career / Job Application submissions (Vercel Functions)
// Validates all required fields & CV metadata server-side, stores in Supabase if configured,
// and optionally dispatches admin email / webhook notification via environment variables.

const ALLOWED_CV_EXTENSIONS = ['.pdf', '.doc', '.docx'];
const MAX_CV_BYTES = 5 * 1024 * 1024; // 5MB

function validatePayload(body) {
  const errors = {};
  const str = (v) => (typeof v === 'string' ? v.trim() : '');

  if (!str(body.fullName) || str(body.fullName).length < 2) {
    errors.fullName = 'Full name is required.';
  }
  const digits = str(body.mobile).replace(/\D/g, '');
  if (digits.length < 8 || digits.length > 15) {
    errors.mobile = 'Valid mobile number is required.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str(body.email))) {
    errors.email = 'Valid email address is required.';
  }
  if (!str(body.city)) {
    errors.city = 'City / Location is required.';
  }
  if (!str(body.profession)) {
    errors.profession = 'Profession is required.';
  }
  if (!str(body.jobType)) {
    errors.jobType = 'Job type is required.';
  }
  if (!str(body.experience)) {
    errors.experience = 'Years of experience is required.';
  }
  if (!str(body.preferredLocation)) {
    errors.preferredLocation = 'Preferred job location is required.';
  }
  if (!str(body.qualification)) {
    errors.qualification = 'Highest qualification is required.';
  }

  if (body.resumeFilename) {
    const lower = str(body.resumeFilename).toLowerCase();
    const validExt = ALLOWED_CV_EXTENSIONS.some((ext) => lower.endsWith(ext));
    if (!validExt) {
      errors.resume = 'Resume must be a PDF, DOC, or DOCX file.';
    }
    if (Number(body.resumeSizeBytes) > MAX_CV_BYTES) {
      errors.resume = 'Resume file must be 5 MB or smaller.';
    }
  }

  return errors;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const errors = validatePayload(body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ ok: false, message: 'Validation failed', errors });
    }

    const now = new Date();
    const dateStamp = now.toISOString().slice(0, 10).replace(/-/g, '');
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    const applicationRef = `MAMI-APP-${dateStamp}-${rand}`;

    const record = {
      application_ref: applicationRef,
      job_id: body.jobId || null,
      applied_job: body.appliedJob || 'General Healthcare Career Application',
      full_name: body.fullName.trim(),
      mobile: body.mobile.trim(),
      email: body.email.trim(),
      city: body.city.trim(),
      profession: body.profession,
      job_type: body.jobType,
      experience: body.experience,
      preferred_location: body.preferredLocation,
      qualification: body.qualification.trim(),
      current_organization: (body.currentOrganization || '').trim(),
      resume_filename: body.resumeFilename || null,
      resume_mime_type: body.resumeMimeType || null,
      resume_size_bytes: body.resumeSizeBytes ? Number(body.resumeSizeBytes) : null,
      message: (body.message || '').trim(),
      status: 'New',
      created_at: now.toISOString(),
    };

    // 1. Persist to Supabase if configured via environment variables
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const dbRes = await fetch(`${supabaseUrl}/rest/v1/career_applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(record),
      });
      if (!dbRes.ok) {
        const errText = await dbRes.text();
        throw new Error(`Database error: ${errText}`);
      }
    }

    // 2. Optional Admin Email Notification via Resend
    if (process.env.RESEND_API_KEY && process.env.MAMI_ADMIN_EMAIL) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || 'MAMI Careers <onboarding@resend.dev>',
          to: [process.env.MAMI_ADMIN_EMAIL],
          subject: `New Career Application: ${record.applied_job} (${applicationRef})`,
          text: `Application Ref: ${applicationRef}\nName: ${record.full_name}\nProfession: ${record.profession}\nApplied For: ${record.applied_job}\nExperience: ${record.experience}\nPreferred Location: ${record.preferred_location}\nEmail: ${record.email}\nMobile: ${record.mobile}`,
        }),
      }).catch(() => {});
    }

    // Return ONLY non-sensitive confirmation fields
    return res.status(201).json({
      ok: true,
      applicationId: applicationRef,
      status: 'New',
      appliedJob: record.applied_job,
      submittedAt: record.created_at,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Unable to submit application right now. Please try again or contact MAMI on WhatsApp.',
    });
  }
}

