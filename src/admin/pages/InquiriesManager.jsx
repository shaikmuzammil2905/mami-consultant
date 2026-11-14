import { useState, useEffect } from 'react';
import {
  MessageSquareText,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Trash2,
  Mail,
  Phone,
  Eye,
  RefreshCw,
  X,
  FileText,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function InquiriesManager() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [notesText, setNotesText] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      let query = supabase.from('contact_inquiries').select('*').order('created_at', { ascending: false });
      if (statusFilter !== 'All') {
        query = query.eq('status', statusFilter);
      }
      const { data, error } = await query;
      if (!error && data) {
        setInquiries(data);
      }
    } catch (err) {
      console.warn('Error fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .update({ status: newStatus })
        .eq('id', id);

      if (!error) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    setSavingNotes(true);
    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .update({ admin_notes: notesText })
        .eq('id', selectedInquiry.id);

      if (!error) {
        setInquiries((prev) =>
          prev.map((item) =>
            item.id === selectedInquiry.id ? { ...item, admin_notes: notesText } : item
          )
        );
        setSelectedInquiry((prev) => ({ ...prev, admin_notes: notesText }));
        alert('Notes updated successfully');
      }
    } catch (err) {
      alert('Failed to save notes: ' + err.message);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this inquiry?')) return;
    try {
      const { error } = await supabase.from('contact_inquiries').delete().eq('id', id);
      if (!error) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
      }
    } catch (err) {
      alert('Failed to delete inquiry: ' + err.message);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const term = search.toLowerCase();
    return (
      inq.full_name?.toLowerCase().includes(term) ||
      inq.email?.toLowerCase().includes(term) ||
      inq.phone?.includes(term) ||
      inq.service_interest?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#0B3566]">Contact Inquiries</h2>
          <p className="text-xs text-gray-500">
            Review inquiries submitted via Contact Us, Enquiry modal, and service pages
          </p>
        </div>
        <button
          type="button"
          onClick={fetchInquiries}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#0B3566] hover:bg-gray-50 transition-colors shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#0799A8]' : ''}`} />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidate name, email, phone, or service..."
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
            <option value="New">New Leads Only</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Converted">Converted</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs text-gray-500">
            <div className="w-8 h-8 border-3 border-[#0799A8]/20 border-t-[#0799A8] rounded-full animate-spin mx-auto mb-2" />
            <span>Loading inquiries from Supabase...</span>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-xs">
            <MessageSquareText className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="font-bold text-[#0B3566]">No contact inquiries found</p>
            <p className="mt-1">Inquiries submitted on the website will be displayed here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Candidate Details</th>
                  <th className="py-3 px-4">Profession & Interest</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-bold text-[#0B3566]">{inq.full_name}</p>
                      <div className="flex items-center gap-3 mt-0.5 text-[11px] text-gray-500">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-[#0799A8]" />
                          <span>{inq.phone}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span className="truncate max-w-[150px]">{inq.email}</span>
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-semibold text-[#0B3566]">
                        {inq.profession || 'Healthcare Professional'}
                      </p>
                      <p className="text-[11px] text-[#0799A8] mt-0.5 truncate max-w-[200px]">
                        {inq.service_interest || 'General Consultation'}
                        {inq.country_interest ? ` • ${inq.country_interest}` : ''}
                      </p>
                    </td>

                    <td className="py-3 px-4 text-[11px] text-gray-500 whitespace-nowrap">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </td>

                    <td className="py-3 px-4">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-full border outline-none cursor-pointer ${
                          inq.status === 'New'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : inq.status === 'Contacted'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : inq.status === 'Converted'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : 'bg-gray-100 text-gray-600 border-gray-200'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Converted">Converted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedInquiry(inq);
                            setNotesText(inq.admin_notes || '');
                          }}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-[#0799A8] hover:bg-gray-100 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(inq.id)}
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

      {/* Inquiry Detail & Admin Notes Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-extrabold text-base text-[#0B3566]">
                  {selectedInquiry.full_name}
                </h3>
                <p className="text-xs text-gray-500">
                  Received on {new Date(selectedInquiry.created_at).toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-400 block text-[10px] font-bold uppercase">Phone</span>
                <span className="font-bold text-[#0B3566]">{selectedInquiry.phone}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-400 block text-[10px] font-bold uppercase">Email</span>
                <span className="font-bold text-[#0B3566] break-all">{selectedInquiry.email}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-400 block text-[10px] font-bold uppercase">Profession</span>
                <span className="font-bold text-[#0B3566]">{selectedInquiry.profession || 'N/A'}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-400 block text-[10px] font-bold uppercase">Service Interest</span>
                <span className="font-bold text-[#0799A8]">{selectedInquiry.service_interest || 'General'}</span>
              </div>
            </div>

            {selectedInquiry.message && (
              <div className="p-3.5 bg-[#EAFBFD] rounded-xl border border-[#CFEFF3]">
                <span className="text-[10px] font-bold uppercase text-[#0799A8] block mb-1">
                  Candidate Message
                </span>
                <p className="text-xs text-[#0B3566] leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </p>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#0B3566] mb-1.5">
                Internal Admin Notes (Private)
              </label>
              <textarea
                rows={3}
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                placeholder="e.g. Spoke on WhatsApp, interested in DHA exam batch starting next month..."
                className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0799A8] outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
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

