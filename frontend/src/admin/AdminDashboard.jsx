import { useState, useEffect } from 'react';
import { Users, Stethoscope, Building, CalendarCheck, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { getAppointmentStats, getDoctors, getServices, getDepartments, getAppointments } from '../API/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0, todayCount: 0 });
  const [counts, setCounts] = useState({ doctors: 0, services: 0, departments: 0 });
  const [recentAppts, setRecentAppts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [s, d, sv, dp, appts] = await Promise.all([
          getAppointmentStats(), getDoctors(), getServices(), getDepartments(), getAppointments()
        ]);
        setStats(s);
        setCounts({ doctors: d.length, services: sv.length, departments: dp.length });
        setRecentAppts(appts.slice(0, 5));
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchAll();
  }, []);

  const statCards = [
    { label: 'Total Doctors', value: counts.doctors, icon: Users, color: 'from-blue-500 to-blue-600', iconBg: 'bg-blue-100 text-blue-600' },
    { label: 'Total Services', value: counts.services, icon: Stethoscope, color: 'from-green-500 to-green-600', iconBg: 'bg-green-100 text-green-600' },
    { label: 'Departments', value: counts.departments, icon: Building, color: 'from-purple-500 to-purple-600', iconBg: 'bg-purple-100 text-purple-600' },
    { label: "Today's Appointments", value: stats.todayCount, icon: CalendarCheck, color: 'from-orange-500 to-orange-600', iconBg: 'bg-orange-100 text-orange-600' },
  ];

  const statusCards = [
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
    { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'text-green-600 bg-green-50 border-green-200' },
    { label: 'Cancelled', value: stats.cancelled, icon: XCircle, color: 'text-red-600 bg-red-50 border-red-200' },
  ];

  const statusBadge = (s) => {
    const map = { pending: 'bg-yellow-100 text-yellow-700', confirmed: 'bg-blue-100 text-blue-700', completed: 'bg-green-100 text-green-700', cancelled: 'bg-red-100 text-red-700' };
    return map[s] || 'bg-gray-100 text-gray-700';
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1><p className="text-gray-600">Welcome back! Here's what's happening.</p></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((c, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-500">{c.label}</p><p className="text-3xl font-bold text-gray-900 mt-1">{c.value}</p></div>
              <div className={`w-12 h-12 rounded-xl ${c.iconBg} flex items-center justify-center`}><c.icon className="w-6 h-6" /></div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Appointment Status</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {statusCards.map((c, i) => (
            <div key={i} className={`rounded-xl border p-4 ${c.color}`}>
              <div className="flex items-center gap-2"><c.icon className="w-5 h-5" /><span className="font-medium">{c.label}</span></div>
              <p className="text-2xl font-bold mt-2">{c.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Recent Appointments</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {recentAppts.length === 0 ? (
            <div className="p-8 text-center text-gray-500"><AlertCircle className="w-10 h-10 mx-auto mb-2 text-gray-300" /><p>No appointments yet</p></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b"><tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Patient</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Department</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Time</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                </tr></thead>
                <tbody className="divide-y divide-gray-100">
                  {recentAppts.map(a => (
                    <tr key={a._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{a.firstName} {a.lastName}</td>
                      <td className="px-4 py-3 text-gray-600">{a.department}</td>
                      <td className="px-4 py-3 text-gray-600">{a.date}</td>
                      <td className="px-4 py-3 text-gray-600">{a.timeSlot}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge(a.status)}`}>{a.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
