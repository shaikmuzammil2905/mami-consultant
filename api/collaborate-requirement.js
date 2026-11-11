// Serverless endpoint for Employer / Hospital Collaboration Requirement submissions

function validateRequirement(body) {
  const errors = {};
  const str = (v) => (typeof v === 'string' ? v.trim() : '');

  if (!str(body.organizationName) || str(body.organizationName).length < 2) {
    errors.organizationName = 'Organization / Hospital name is required.';
  }
  if (!str(body.contactPerson) || str(body.contactPerson).length < 2) {
    errors.contactPerson = 'Contact person full name is required.';
  }
  if (!str(body.designation)) {
    errors.designation = 'Designation / Role is required.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str(body.email))) {
    errors.email = 'Valid business email address is required.';
  }
  const digits = str(body.mobile).replace(/\D/g, '');
  if (digits.length < 8 || digits.length > 15) {
    errors.mobile = 'Valid mobile number is required.';
  }
  if (!str(body.location)) {
    errors.location = 'Organization location is required.';
  }
  if (!str(body.organizationType)) {
    errors.organizationType = 'Organization type is required.';
  }
  const count = Number(body.peopleRequired);
  if (!Number.isFinite(count) || count < 1) {
    errors.peopleRequired = 'Please enter at least 1 position required.';
  }
  if (!Array.isArray(body.employeeTypes) || body.employeeTypes.length === 0) {
    errors.employeeTypes = 'Select at least one employee type required.';
  }
  if (!str(body.jobPosition)) {
    errors.jobPosition = 'Job position / role is required.';
  }
  if (!str(body.qualification)) {
    errors.qualification = 'Required qualification is required.';
  }
  if (!str(body.experience)) {
    errors.experience = 'Experience requirement is required.';
  }
  if (!str(body.preferredLocation)) {
    errors.preferredLocation = 'Preferred work location is required.';
  }
  if (!str(body.joiningTimeline)) {
    errors.joiningTimeline = 'Expected joining timeline is required.';
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
    const errors = validateRequirement(body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ ok: false, message: 'Validation failed', errors });
    }

    const now = new Date();
    const dateStamp = now.toISOString().slice(0, 10).replace(/-/g, '');
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    const requirementRef = `MAMI-REQ-${dateStamp}-${rand}`;

    const record = {
      requirement_ref: requirementRef,
      organization_name: body.organizationName.trim(),
      contact_person: body.contactPerson.trim(),
      designation: body.designation,
      email: body.email.trim(),
      mobile: body.mobile.trim(),
      location: body.location.trim(),
      organization_type: body.organizationType,
      people_required: Number(body.peopleRequired),
      employee_types: body.employeeTypes,
      job_position: body.jobPosition.trim(),
      qualification: body.qualification.trim(),
      experience: body.experience,
      preferred_location: body.preferredLocation,
      joining_timeline: body.joiningTimeline,
      additional_requirements: (body.additionalRequirements || '').trim(),
      status: 'New',
      created_at: now.toISOString(),
    };

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const dbRes = await fetch(`${supabaseUrl}/rest/v1/collaboration_requirements`, {
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

    if (process.env.RESEND_API_KEY && process.env.MAMI_ADMIN_EMAIL) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || 'MAMI Partnerships <onboarding@resend.dev>',
          to: [process.env.MAMI_ADMIN_EMAIL],
          subject: `New Partner Hiring Requirement: ${record.organization_name} (${requirementRef})`,
          text: `Requirement Ref: ${requirementRef}\nOrganization: ${record.organization_name} (${record.organization_type})\nContact: ${record.contact_person} (${record.designation})\nPeople Required: ${record.people_required}\nEmployee Types: ${record.employee_types.join(', ')}\nPosition: ${record.job_position}\nPreferred Location: ${record.preferred_location}\nTimeline: ${record.joining_timeline}\nEmail: ${record.email}\nMobile: ${record.mobile}`,
        }),
      }).catch(() => {});
    }

    return res.status(201).json({
      ok: true,
      requirementId: requirementRef,
      status: 'New',
      submittedAt: record.created_at,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Unable to submit requirement right now. Please try again or contact MAMI on WhatsApp.',
    });
  }
}

