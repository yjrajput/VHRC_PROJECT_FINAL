import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { getAllDoctors, createDoctor, updateDoctor, deleteDoctor, getImageUrl } from '../API/api';

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', specialty: '', image: '', experience: '', rating: 0, reviews: 0, education: '', specialties: '', location: '', availability: '', department: '', languages: '', certifications: '', bio: '', isActive: true });
  const [imageFile, setImageFile] = useState(null);

  const fetchDoctors = async () => {
    try { setDoctors(await getAllDoctors()); } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchDoctors(); }, []);

  const resetForm = () => {
    setForm({ name: '', specialty: '', image: '', experience: '', rating: 0, reviews: 0, education: '', specialties: '', location: '', availability: '', department: '', languages: '', certifications: '', bio: '', isActive: true });
    setImageFile(null);
    setEditing(null); setShowForm(false);
  };

  const handleEdit = (doc) => {
    setForm({ ...doc, specialties: doc.specialties?.join(', ') || '', languages: doc.languages?.join(', ') || '', certifications: doc.certifications?.join(', ') || '' });
    setImageFile(null);
    setEditing(doc._id); setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(key => {
      if (['specialties', 'languages', 'certifications'].includes(key)) {
        form[key].split(',').map(s => s.trim()).filter(Boolean).forEach(s => formData.append(key, s));
      } else if (key === 'rating' || key === 'reviews') {
        formData.append(key, Number(form[key]));
      } else if (key !== 'image') {
        formData.append(key, form[key]);
      }
    });
    
    if (imageFile) {
      formData.append('image', imageFile);
    }
    
    try {
      if (editing) { await updateDoctor(editing, formData); }
      else { await createDoctor(formData); }
      resetForm(); fetchDoctors();
    } catch (e) { alert(e.message); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this doctor?')) return;
    try { await deleteDoctor(id); fetchDoctors(); } catch (e) { alert(e.message); }
  };

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm";

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Manage Doctors</h1><p className="text-gray-600">{doctors.length} doctors total</p></div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />Add Doctor
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{editing ? 'Edit Doctor' : 'Add New Doctor'}</h2>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Name *</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className={inputClass} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Specialty *</label><input value={form.specialty} onChange={e => setForm({...form, specialty: e.target.value})} required className={inputClass} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Department *</label><input value={form.department} onChange={e => setForm({...form, department: e.target.value})} required className={inputClass} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Experience *</label><input value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} required className={inputClass} placeholder="e.g. 15+ years" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Education</label><input value={form.education} onChange={e => setForm({...form, education: e.target.value})} className={inputClass} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Location</label><input value={form.location} onChange={e => setForm({...form, location: e.target.value})} className={inputClass} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Availability</label><input value={form.availability} onChange={e => setForm({...form, availability: e.target.value})} className={inputClass} placeholder="e.g. Mon-Fri" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Rating</label><input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={e => setForm({...form, rating: e.target.value})} className={inputClass} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Reviews</label><input type="number" value={form.reviews} onChange={e => setForm({...form, reviews: e.target.value})} className={inputClass} /></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Image</label>
              <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className={inputClass} />
              {editing && form.image && !imageFile && <p className="text-xs text-gray-500 mt-1">Current image: {form.image.split('/').pop()}</p>}
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Specialties (comma separated)</label><input value={form.specialties} onChange={e => setForm({...form, specialties: e.target.value})} className={inputClass} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Languages (comma separated)</label><input value={form.languages} onChange={e => setForm({...form, languages: e.target.value})} className={inputClass} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Bio</label><textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} rows={3} className={inputClass} /></div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} id="active" />
              <label htmlFor="active" className="text-sm text-gray-700">Active</label>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"><Save className="w-4 h-4" />{editing ? 'Update' : 'Create'}</button>
              <button type="button" onClick={resetForm} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b"><tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Doctor</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Specialty</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Department</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Experience</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-100">
              {doctors.map(d => (
                <tr key={d._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={getImageUrl(d.image)} alt={d.name} className="w-10 h-10 rounded-full object-cover" onError={e => e.target.src = 'https://via.placeholder.com/40'} />
                      <div><p className="font-medium text-gray-900">{d.name}</p><p className="text-xs text-gray-500">{d.education}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{d.specialty}</td>
                  <td className="px-4 py-3 text-gray-600">{d.department}</td>
                  <td className="px-4 py-3 text-gray-600">{d.experience}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${d.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{d.isActive ? 'Active' : 'Inactive'}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(d)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(d._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDoctors;
