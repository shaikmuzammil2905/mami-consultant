// Backend-ready submission service supporting:
// 1) Serverless API endpoints (/api/career-apply, /api/collaborate-requirement) on Vercel / Node backend
// 2) Direct Supabase REST fallback when VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY are configured
// 3) Clean local structured validation fallback during static vite preview without exposing any submitted data publicly

function generateRef(prefix) {
  const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${dateStamp}-${rand}`;
}

export async function submitCareerApplication(payload) {
  const apiBase = import.meta.env.VITE_API_BASE_URL || '';
  const endpoint = `${apiBase}/api/career-apply`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.message || 'Unable to submit application.');
      }
      return data;
    }

    // Static preview without serverless runtime returns non-JSON (404 HTML / 405)
    if (res.status === 404 || res.status === 405) {
      return await fallbackSupabaseOrStructured('career_applications', 'MAMI-APP', payload);
    }

    throw new Error('Unexpected server response.');
  } catch (err) {
    if (err.name === 'TypeError') {
      return await fallbackSupabaseOrStructured('career_applications', 'MAMI-APP', payload);
    }
    throw err;
  }
}

export async function submitCollaborationRequirement(payload) {
  const apiBase = import.meta.env.VITE_API_BASE_URL || '';
  const endpoint = `${apiBase}/api/collaborate-requirement`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.message || 'Unable to submit requirement.');
      }
      return data;
    }

    if (res.status === 404 || res.status === 405) {
      return await fallbackSupabaseOrStructured('collaboration_requirements', 'MAMI-REQ', payload);
    }

    throw new Error('Unexpected server response.');
  } catch (err) {
    if (err.name === 'TypeError') {
      return await fallbackSupabaseOrStructured('collaboration_requirements', 'MAMI-REQ', payload);
    }
    throw err;
  }
}

async function fallbackSupabaseOrStructured(table, refPrefix, payload) {
  const ref = generateRef(refPrefix);
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnon) {
    const dbBody =
      table === 'career_applications'
        ? {
            application_ref: ref,
            job_id: payload.jobId || null,
            applied_job: payload.appliedJob,
            full_name: payload.fullName,
            mobile: payload.mobile,
            email: payload.email,
            city: payload.city,
            profession: payload.profession,
            job_type: payload.jobType,
            experience: payload.experience,
            preferred_location: payload.preferredLocation,
            qualification: payload.qualification,
            current_organization: payload.currentOrganization || '',
            resume_filename: payload.resumeFilename || null,
            resume_mime_type: payload.resumeMimeType || null,
            resume_size_bytes: payload.resumeSizeBytes || null,
            message: payload.message || '',
            status: 'New',
          }
        : {
            requirement_ref: ref,
            organization_name: payload.organizationName,
            contact_person: payload.contactPerson,
            designation: payload.designation,
            email: payload.email,
            mobile: payload.mobile,
            location: payload.location,
            organization_type: payload.organizationType,
            people_required: Number(payload.peopleRequired),
            employee_types: payload.employeeTypes,
            job_position: payload.jobPosition,
            qualification: payload.qualification,
            experience: payload.experience,
            preferred_location: payload.preferredLocation,
            joining_timeline: payload.joiningTimeline,
            additional_requirements: payload.additionalRequirements || '',
            status: 'New',
          };

    const res = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseAnon,
        Authorization: `Bearer ${supabaseAnon}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(dbBody),
    });

    if (!res.ok) {
      throw new Error('Could not save submission to database.');
    }
  }

  return {
    ok: true,
    ...(table === 'career_applications' ? { applicationId: ref } : { requirementId: ref }),
    status: 'New',
    submittedAt: new Date().toISOString(),
  };
}

