import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { getAllServices, createService, updateService, deleteService } from '../API/api';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', icon: 'Heart', color: 'text-red-500 bg-red-50', hoverColor: 'group-hover:bg-red-500 group-hover:text-white', isActive: true });

  const iconOptions = ['Heart', 'Brain', 'Eye', 'Baby', 'Bone', 'Stethoscope', 'Activity', 'Pill'];
  const fetch = async () => { try { setServices(await getAllServices()); } catch(e) { console.error(e); } finally { setLoading(false); } };
  useEffect(() => { fetch(); }, []);

  const resetForm = () => { setForm({ title: '', description: '', icon: 'Heart', color: 'text-red-500 bg-red-50', hoverColor: 'group-hover:bg-red-500 group-hover:text-white', isActive: true }); setEditing(null); setShowForm(false); };
  const handleEdit = (s) => { setForm({ ...s }); setEditing(s._id); setShowForm(true); };
  const handleSubmit = async (e) => { e.preventDefault(); try { editing ? await updateService(editing, form) : await createService(form); resetForm(); fetch(); } catch(e) { alert(e.message); } };
  const handleDelete = async (id) => { if (!confirm('Delete this service?')) return; try { await deleteService(id); fetch(); } catch(e) { alert(e.message); } };

  const inp = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm";
  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Manage Services</h1><p className="text-gray-600">{services.length} services total</p></div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"><Plus className="w-4 h-4" />Add Service</button>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold">{editing ? 'Edit' : 'Add'} Service</h2><button onClick={resetForm}><X className="w-5 h-5 text-gray-400" /></button></div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Title *</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required className={inp} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Icon *</label>
                <select value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} className={inp}>{iconOptions.map(i => <option key={i} value={i}>{i}</option>)}</select>
              </div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Description *</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} required rows={3} className={inp} /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Color Classes</label><input value={form.color} onChange={e => setForm({...form, color: e.target.value})} className={inp} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Hover Color Classes</label><input value={form.hoverColor} onChange={e => setForm({...form, hoverColor: e.target.value})} className={inp} /></div>
            </div>
            <div className="flex items-center gap-2"><input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} id="sActive" /><label htmlFor="sActive" className="text-sm">Active</label></div>
            <div className="flex gap-3">
              <button type="submit" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"><Save className="w-4 h-4" />{editing ? 'Update' : 'Create'}</button>
              <button type="button" onClick={resetForm} className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
            </div>
          </form>
        </div>
      )}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50 border-b"><tr>
          <th className="px-4 py-3 text-left font-medium text-gray-600">Title</th><th className="px-4 py-3 text-left font-medium text-gray-600">Icon</th>
          <th className="px-4 py-3 text-left font-medium text-gray-600">Description</th><th className="px-4 py-3 text-left font-medium text-gray-600">Status</th><th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
        </tr></thead><tbody className="divide-y">
          {services.map(s => (
            <tr key={s._id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">{s.title}</td>
              <td className="px-4 py-3 text-gray-600">{s.icon}</td>
              <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{s.description}</td>
              <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${s.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{s.isActive ? 'Active' : 'Inactive'}</span></td>
              <td className="px-4 py-3"><div className="flex gap-2"><button onClick={() => handleEdit(s)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><Edit className="w-4 h-4" /></button><button onClick={() => handleDelete(s._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></button></div></td>
            </tr>
          ))}
        </tbody></table>
      </div>
    </div>
  );
};
export default AdminServices;
