import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { getAllDepartments, createDepartment, updateDepartment, deleteDepartment } from '../API/api';

const AdminDepartments = () => {
  const [depts, setDepts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', icon: 'Activity', image: '', color: 'text-red-500 bg-red-50', stats: { patients: '', response: '', staff: '', availability: '' }, services: '', facilities: '', contactInfo: { phone: '', location: '', director: '' }, isActive: true });

  const fetchData = async () => { try { setDepts(await getAllDepartments()); } catch(e) { console.error(e); } finally { setLoading(false); } };
  useEffect(() => { fetchData(); }, []);

  const resetForm = () => { setForm({ name: '', description: '', icon: 'Activity', image: '', color: 'text-red-500 bg-red-50', stats: { patients: '', response: '', staff: '', availability: '' }, services: '', facilities: '', contactInfo: { phone: '', location: '', director: '' }, isActive: true }); setEditing(null); setShowForm(false); };

  const handleEdit = (d) => { setForm({ ...d, services: d.services?.join(', ') || '', facilities: d.facilities?.join(', ') || '' }); setEditing(d._id); setShowForm(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, services: form.services.split(',').map(s => s.trim()).filter(Boolean), facilities: form.facilities.split(',').map(s => s.trim()).filter(Boolean) };
    try { editing ? await updateDepartment(editing, data) : await createDepartment(data); resetForm(); fetchData(); } catch(e) { alert(e.message); }
  };

  const handleDelete = async (id) => { if (!confirm('Delete?')) return; try { await deleteDepartment(id); fetchData(); } catch(e) { alert(e.message); } };

  const inp = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm";
  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Manage Departments</h1><p className="text-gray-600">{depts.length} departments</p></div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"><Plus className="w-4 h-4" />Add Department</button>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold">{editing ? 'Edit' : 'Add'} Department</h2><button onClick={resetForm}><X className="w-5 h-5 text-gray-400" /></button></div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Name *</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className={inp} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Icon</label><input value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} className={inp} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Color Classes</label><input value={form.color} onChange={e => setForm({...form, color: e.target.value})} className={inp} /></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Description *</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} required rows={2} className={inp} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label><input value={form.image} onChange={e => setForm({...form, image: e.target.value})} className={inp} /></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Patients</label><input value={form.stats.patients} onChange={e => setForm({...form, stats: {...form.stats, patients: e.target.value}})} className={inp} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Response</label><input value={form.stats.response} onChange={e => setForm({...form, stats: {...form.stats, response: e.target.value}})} className={inp} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Staff</label><input value={form.stats.staff} onChange={e => setForm({...form, stats: {...form.stats, staff: e.target.value}})} className={inp} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Availability</label><input value={form.stats.availability} onChange={e => setForm({...form, stats: {...form.stats, availability: e.target.value}})} className={inp} /></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Services (comma separated)</label><input value={form.services} onChange={e => setForm({...form, services: e.target.value})} className={inp} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Facilities (comma separated)</label><input value={form.facilities} onChange={e => setForm({...form, facilities: e.target.value})} className={inp} /></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input value={form.contactInfo.phone} onChange={e => setForm({...form, contactInfo: {...form.contactInfo, phone: e.target.value}})} className={inp} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Location</label><input value={form.contactInfo.location} onChange={e => setForm({...form, contactInfo: {...form.contactInfo, location: e.target.value}})} className={inp} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Director</label><input value={form.contactInfo.director} onChange={e => setForm({...form, contactInfo: {...form.contactInfo, director: e.target.value}})} className={inp} /></div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"><Save className="w-4 h-4" />{editing ? 'Update' : 'Create'}</button>
              <button type="button" onClick={resetForm} className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
            </div>
          </form>
        </div>
      )}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50 border-b"><tr>
          <th className="px-4 py-3 text-left font-medium text-gray-600">Department</th><th className="px-4 py-3 text-left font-medium text-gray-600">Staff</th>
          <th className="px-4 py-3 text-left font-medium text-gray-600">Director</th><th className="px-4 py-3 text-left font-medium text-gray-600">Status</th><th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
        </tr></thead><tbody className="divide-y">
          {depts.map(d => (
            <tr key={d._id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">{d.name}</td>
              <td className="px-4 py-3 text-gray-600">{d.stats?.staff || '-'}</td>
              <td className="px-4 py-3 text-gray-600">{d.contactInfo?.director || '-'}</td>
              <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${d.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{d.isActive ? 'Active' : 'Inactive'}</span></td>
              <td className="px-4 py-3"><div className="flex gap-2"><button onClick={() => handleEdit(d)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><Edit className="w-4 h-4" /></button><button onClick={() => handleDelete(d._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></button></div></td>
            </tr>
          ))}
        </tbody></table>
      </div>
    </div>
  );
};
export default AdminDepartments;
