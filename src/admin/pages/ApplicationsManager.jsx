import { useState, useEffect } from 'react';
import {
  BriefcaseBusiness,
  Search,
  Filter,
  FileDown,
  Trash2,
  Mail,
  Phone,
  Eye,
  RefreshCw,
  X,
  MapPin,
  GraduationCap,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function ApplicationsManager() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);
  const [notesText, setNotesText] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      let query = supabase.from('career_applications').select('*').order('created_at', { ascending: false });
      if (statusFilter !== 'All') {
        query = query.eq('status', statusFilter);
      }
      const { data, error } = await query;
      if (!error && data) {
        setApplications(data);
      }
    } catch (err) {
      console.warn('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('career_applications')
        .update({ status: newStatus })
        .eq('id', id);

      if (!error) {
        setApplications((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedApp?.id === id) {
          setSelectedApp((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedApp) return;
    setSavingNotes(true);
    try {
      const { error } = await supabase
        .from('career_applications')
        .update({ admin_notes: notesText })
        .eq('id', selectedApp.id);

      if (!error) {
        setApplications((prev) =>
          prev.map((item) =>
            item.id === selectedApp.id ? { ...item, admin_notes: notesText } : item
          )
        );
        setSelectedApp((prev) => ({ ...prev, admin_notes: notesText }));
        alert('Application notes saved');
      }
    } catch (err) {
      alert('Failed to save notes: ' + err.message);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this job application?')) return;
    try {
      const { error } = await supabase.from('career_applications').delete().eq('id', id);
      if (!error) {
        setApplications((prev) => prev.filter((item) => item.id !== id));
        if (selectedApp?.id === id) setSelectedApp(null);
      }
    } catch (err) {
      alert('Failed to delete application: ' + err.message);
    }
  };

  const filtered = applications.filter((app) => {
    const term = search.toLowerCase();
    return (
      app.full_name?.toLowerCase().includes(term) ||
      app.applied_job?.toLowerCase().includes(term) ||
      app.application_ref?.toLowerCase().includes(term) ||
      app.profession?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#0B3566]">Career & Job Applications</h2>
          <p className="text-xs text-gray-500">
            Healthcare candidate CVs and applications received via /career and /career/apply
          </p>
        </div>
        <button
          type="button"
          onClick={fetchApplications}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#0B3566] hover:bg-gray-50 transition-colors shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#0799A8]' : ''}`} />
          <span>Refresh Applications</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidate name, job title, reference ID, or profession..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0799A8] outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[#0B3566] font-semibold focus:bg-white focus:ring-2 focus:ring-[#0799A8] outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="New">New Applications</option>
            <option value="Under Review">Under Review</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs text-gray-500">
            <div className="w-8 h-8 border-3 border-[#0799A8]/20 border-t-[#0799A8] rounded-full animate-spin mx-auto mb-2" />
            <span>Loading applications from database...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-xs">
            <BriefcaseBusiness className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="font-bold text-[#0B3566]">No career applications found</p>
            <p className="mt-1">Candidate applications submitted on the website will be displayed here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Applicant & Ref</th>
                  <th className="py-3 px-4">Applied Job & Profession</th>
                  <th className="py-3 px-4">Experience & City</th>
                  <th className="py-3 px-4">Resume / CV</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                {filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-[#0B3566]">{app.full_name}</p>
                        <span className="font-mono text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                          {app.application_ref}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 text-[11px] text-gray-500">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-[#0799A8]" />
                          <span>{app.mobile}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span className="truncate max-w-[140px]">{app.email}</span>
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-bold text-[#0B3566]">{app.applied_job}</p>
                      <p className="text-[11px] text-[#0799A8] mt-0.5 font-medium">
                        {app.profession} ({app.job_type})
                      </p>
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-semibold text-gray-800">{app.experience} Exp</p>
                      <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span>{app.city} → {app.preferred_location}</span>
                      </p>
                    </td>

                    <td className="py-3 px-4">
                      {app.resume_storage_path ? (
                        <a
                          href={app.resume_storage_path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0799A8] hover:underline"
                        >
                          <FileDown className="w-3.5 h-3.5" />
                          <span className="truncate max-w-[100px]">
                            {app.resume_filename || 'Download CV'}
                          </span>
                        </a>
                      ) : (
                        <span className="text-[11px] text-gray-400">
                          {app.resume_filename || 'No file attached'}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-full border outline-none cursor-pointer ${
                          app.status === 'New'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : app.status === 'Shortlisted'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : app.status === 'Selected'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : app.status === 'Rejected'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : 'bg-gray-100 text-gray-600 border-gray-200'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedApp(app);
                            setNotesText(app.admin_notes || '');
                          }}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-[#0799A8] hover:bg-gray-100 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(app.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-[#0B3566]">
                    {selectedApp.full_name}
                  </h3>
                  <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">
                    {selectedApp.application_ref}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Applied for <span className="font-bold text-[#0799A8]">{selectedApp.applied_job}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-400 block text-[10px] font-bold uppercase">Phone</span>
                <span className="font-bold text-[#0B3566]">{selectedApp.mobile}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-400 block text-[10px] font-bold uppercase">Email</span>
                <span className="font-bold text-[#0B3566] break-all">{selectedApp.email}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-400 block text-[10px] font-bold uppercase">Qualification</span>
                <span className="font-bold text-[#0B3566]">{selectedApp.qualification}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-400 block text-[10px] font-bold uppercase">Experience</span>
                <span className="font-bold text-[#0B3566]">{selectedApp.experience}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-400 block text-[10px] font-bold uppercase">Current Org</span>
                <span className="font-bold text-[#0B3566]">{selectedApp.current_organization || 'N/A'}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-400 block text-[10px] font-bold uppercase">Preferred Location</span>
                <span className="font-bold text-[#0799A8]">{selectedApp.preferred_location}</span>
              </div>
            </div>

            {selectedApp.message && (
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1">
                  Candidate Note / Cover Letter
                </span>
                <p className="text-xs text-[#0B3566] leading-relaxed whitespace-pre-wrap">
                  {selectedApp.message}
                </p>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#0B3566] mb-1.5">
                Internal Recruiter Assessment Notes
              </label>
              <textarea
                rows={3}
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                placeholder="Candidate has 4 years experience in Apollo, DHA Prometric exam passed, ready to relocate..."
                className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0799A8] outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={savingNotes}
                className="px-4 py-2 text-xs font-bold text-white bg-[#0799A8] hover:bg-[#007C91] rounded-xl shadow-xs disabled:opacity-50"
              >
                {savingNotes ? 'Saving...' : 'Save Recruiter Notes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

