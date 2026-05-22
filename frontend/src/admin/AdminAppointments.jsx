import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, Trash2, Filter } from 'lucide-react';
import { getAppointments, updateAppointment, deleteAppointment } from '../API/api';

const AdminAppointments = () => {
  const [appts, setAppts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDept, setFilterDept] = useState('all');

  const fetchData = async () => {
    try {
      const filters = {};
      if (filterStatus !== 'all') filters.status = filterStatus;
      if (filterDept !== 'all') filters.department = filterDept;
      setAppts(await getAppointments(filters));
    } catch(e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [filterStatus, filterDept]);

  const handleStatusChange = async (id, status) => {
    try { await updateAppointment(id, { status }); fetchData(); } catch(e) { alert(e.message); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this appointment?')) return;
    try { await deleteAppointment(id); fetchData(); } catch(e) { alert(e.message); }
  };

  const badge = (s) => {
    const m = { pending: 'bg-yellow-100 text-yellow-700', confirmed: 'bg-blue-100 text-blue-700', completed: 'bg-green-100 text-green-700', cancelled: 'bg-red-100 text-red-700' };
    return m[s] || 'bg-gray-100 text-gray-700';
  };

  const depts = ['all', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Ophthalmology', 'Internal Medicine', 'Emergency Care'];

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Appointment Monitor</h1><p className="text-gray-600">{appts.length} appointments found</p></div>

      <div className="flex flex-wrap gap-4 items-center bg-white rounded-xl shadow-sm border p-4">
        <Filter className="w-5 h-5 text-gray-400" />
        <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setLoading(true); }} className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select value={filterDept} onChange={e => { setFilterDept(e.target.value); setLoading(true); }} className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          {depts.map(d => <option key={d} value={d}>{d === 'all' ? 'All Departments' : d}</option>)}
        </select>
      </div>

      {appts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-gray-500 text-lg">No appointments found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b"><tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Patient</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Contact</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Department</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Doctor</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Date & Time</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
              </tr></thead>
              <tbody className="divide-y">
                {appts.map(a => (
                  <tr key={a._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3"><p className="font-medium text-gray-900">{a.firstName} {a.lastName}</p></td>
                    <td className="px-4 py-3"><p className="text-gray-600 text-xs">{a.email}</p><p className="text-gray-600 text-xs">{a.phone}</p></td>
                    <td className="px-4 py-3 text-gray-600">{a.department}</td>
                    <td className="px-4 py-3 text-gray-600">{a.preferredDoctor || 'Any'}</td>
                    <td className="px-4 py-3"><p className="text-gray-900 font-medium">{a.date}</p><p className="text-gray-500 text-xs">{a.timeSlot}</p></td>
                    <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${badge(a.status)}`}>{a.status}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <select value={a.status} onChange={e => handleStatusChange(a._id, e.target.value)} className="text-xs border rounded px-1 py-1 focus:outline-none">
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <button onClick={() => handleDelete(a._id)} className="p-1 rounded hover:bg-red-50 text-red-500"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminAppointments;
