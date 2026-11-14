import { useState, useEffect } from 'react';
import {
  Building2,
  Search,
  Filter,
  Users,
  MapPin,
  Clock,
  Trash2,
  Mail,
  Phone,
  Eye,
  RefreshCw,
  X,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function CollaborationManager() {
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCollab, setSelectedCollab] = useState(null);
  const [notesText, setNotesText] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  const fetchRequirements = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('collaboration_requirements')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'All') {
        query = query.eq('status', statusFilter);
      }
      const { data, error } = await query;
      if (!error && data) {
        setRequirements(data);
      }
    } catch (err) {
      console.warn('Error fetching partner requirements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, [statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('collaboration_requirements')
        .update({ status: newStatus })
        .eq('id', id);

      if (!error) {
        setRequirements((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedCollab?.id === id) {
          setSelectedCollab((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedCollab) return;
    setSavingNotes(true);
    try {
      const { error } = await supabase
        .from('collaboration_requirements')
        .update({ admin_notes: notesText })
        .eq('id', selectedCollab.id);

      if (!error) {
        setRequirements((prev) =>
          prev.map((item) =>
            item.id === selectedCollab.id ? { ...item, admin_notes: notesText } : item
          )
        );
        setSelectedCollab((prev) => ({ ...prev, admin_notes: notesText }));
        alert('Partner notes saved');
      }
    } catch (err) {
      alert('Failed to save notes: ' + err.message);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this partner requirement?')) return;
    try {
      const { error } = await supabase.from('collaboration_requirements').delete().eq('id', id);
      if (!error) {
        setRequirements((prev) => prev.filter((item) => item.id !== id));
        if (selectedCollab?.id === id) setSelectedCollab(null);
      }
    } catch (err) {
      alert('Failed to delete requirement: ' + err.message);
    }
  };

  const filtered = requirements.filter((item) => {
    const term = search.toLowerCase();
    return (
      item.organization_name?.toLowerCase().includes(term) ||
      item.contact_person?.toLowerCase().includes(term) ||
      item.requirement_ref?.toLowerCase().includes(term) ||
      item.location?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#0B3566]">Partner & Hospital Requirements</h2>
          <p className="text-xs text-gray-500">
            Staffing requirements submitted by hospitals, medical clinics, and healthcare groups via /collaborate
          </p>
        </div>
        <button
          type="button"
          onClick={fetchRequirements}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#0B3566] hover:bg-gray-50 transition-colors shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#0799A8]' : ''}`} />
          <span>Refresh Requirements</span>
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
            placeholder="Search organization name, contact person, or location..."
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
            <option value="New">New Requirements</option>
            <option value="Under Review">Under Review</option>
            <option value="Contacted">Contacted</option>
            <option value="Requirement Confirmed">Requirement Confirmed</option>
            <option value="Profiles Shared">Profiles Shared</option>
            <option value="Position Filled">Position Filled</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs text-gray-500">
            <div className="w-8 h-8 border-3 border-[#0799A8]/20 border-t-[#0799A8] rounded-full animate-spin mx-auto mb-2" />
            <span>Loading requirements from database...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-xs">
            <Building2 className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="font-bold text-[#0B3566]">No partnership requirements found</p>
            <p className="mt-1">Hospital inquiries received through /collaborate will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Hospital / Partner</th>
                  <th className="py-3 px-4">Demand & Position</th>
                  <th className="py-3 px-4">Location & Timeline</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-[#0B3566]">{item.organization_name}</p>
                        <span className="font-mono text-[10px] bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded">
                          {item.requirement_ref}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {item.contact_person} ({item.designation}) • {item.mobile}
                      </p>
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-bold text-[#0B3566]">
                        {item.people_required} Positions: {item.job_position}
                      </p>
                      <p className="text-[11px] text-[#0799A8] mt-0.5">
                        {Array.isArray(item.employee_types)
                          ? item.employee_types.join(', ')
                          : item.organization_type}
                      </p>
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-semibold text-gray-800">{item.location}</p>
                      <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>Timeline: {item.joining_timeline}</span>
                      </p>
                    </td>

                    <td className="py-3 px-4">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-full border outline-none cursor-pointer ${
                          item.status === 'New'
                            ? 'bg-teal-50 text-teal-700 border-teal-200'
                            : item.status === 'Requirement Confirmed'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : item.status === 'Position Filled'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-gray-100 text-gray-600 border-gray-200'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Requirement Confirmed">Requirement Confirmed</option>
                        <option value="Profiles Shared">Profiles Shared</option>
                        <option value="Position Filled">Position Filled</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCollab(item);
                            setNotesText(item.admin_notes || '');
                          }}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-[#0799A8] hover:bg-gray-100 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
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
      {selectedCollab && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-extrabold text-base text-[#0B3566]">
                  {selectedCollab.organization_name}
                </h3>
                <p className="text-xs text-gray-500">
                  Ref: <span className="font-mono text-[#0799A8]">{selectedCollab.requirement_ref}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCollab(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-400 block text-[10px] font-bold uppercase">Contact Person</span>
                <span className="font-bold text-[#0B3566]">{selectedCollab.contact_person}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-400 block text-[10px] font-bold uppercase">Designation</span>
                <span className="font-bold text-[#0B3566]">{selectedCollab.designation}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-400 block text-[10px] font-bold uppercase">Phone</span>
                <span className="font-bold text-[#0B3566]">{selectedCollab.mobile}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-400 block text-[10px] font-bold uppercase">Email</span>
                <span className="font-bold text-[#0B3566] break-all">{selectedCollab.email}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-400 block text-[10px] font-bold uppercase">Requirement Count</span>
                <span className="font-bold text-[#0799A8]">{selectedCollab.people_required} Professionals</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-400 block text-[10px] font-bold uppercase">Joining Timeline</span>
                <span className="font-bold text-[#0B3566]">{selectedCollab.joining_timeline}</span>
              </div>
            </div>

            {selectedCollab.additional_requirements && (
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1">
                  Specific Clinical Requirements
                </span>
                <p className="text-xs text-[#0B3566] leading-relaxed whitespace-pre-wrap">
                  {selectedCollab.additional_requirements}
                </p>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#0B3566] mb-1.5">
                Internal Account Notes
              </label>
              <textarea
                rows={3}
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                placeholder="Hospital HR requested 5 Physiotherapists with DHA eligibility letter by next quarter..."
                className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0799A8] outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedCollab(null)}
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
                {savingNotes ? 'Saving...' : 'Save Notes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

