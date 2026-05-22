import React, { useState } from "react";
import { Calendar, User, FileText } from "lucide-react";
import toast from "react-hot-toast";
import { createAppointment, getDoctors } from "../API/api";
import { useApiData } from "../hooks/useApiData";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    date: '', timeSlot: '', department: '', preferredDoctor: '', symptoms: ''
  });
  const { data: doctors } = useApiData('vhrc_doctors', getDoctors, []);
  const [submitting, setSubmitting] = useState(false);

  const departments = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Ophthalmology', 'Internal Medicine', 'Emergency Care', 'Dermatology'];
  const timeSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createAppointment(formData);
      toast.success('Appointment booked successfully! We will contact you within 24 hours.');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', date: '', timeSlot: '', department: '', preferredDoctor: '', symptoms: '' });
    } catch (error) {
      toast.error(error.message || 'Failed to book appointment');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full mt-1.5 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#193151] focus:border-[#193151] focus:outline-none transition-all duration-300 text-base bg-white shadow-sm";

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-12">
      <div className="shadow-xl border-0 bg-white rounded-2xl overflow-hidden">
        <div className="bg-[#193151] text-white">
          <h2 className="text-2xl text-center py-5 font-semibold">Appointment Request Form</h2>
        </div>
        <div className="p-4 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#193151] flex items-center gap-2"><User className="w-5 h-5 text-[#D74552]" />Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700">First Name *</label><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter your first name" required className={inputClass} /></div>
                <div><label className="block text-sm font-medium text-gray-700">Last Name *</label><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter your last name" required className={inputClass} /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700">Email *</label><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" required className={inputClass} /></div>
                <div><label className="block text-sm font-medium text-gray-700">Phone *</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 1234567890" required className={inputClass} /></div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#193151] flex items-center gap-2"><Calendar className="w-5 h-5 text-[#D74552]" />Appointment Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700">Preferred Date *</label><input type="date" name="date" value={formData.date} onChange={handleChange} min={new Date().toISOString().split("T")[0]} required className={inputClass} /></div>
                <div><label className="block text-sm font-medium text-gray-700">Preferred Time *</label>
                  <select name="timeSlot" value={formData.timeSlot} onChange={handleChange} required className={inputClass}>
                    <option value="">Select time slot</option>
                    {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700">Department *</label>
                  <select name="department" value={formData.department} onChange={handleChange} required className={inputClass}>
                    <option value="">Select department</option>
                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div><label className="block text-sm font-medium text-gray-700">Preferred Doctor</label>
                  <select name="preferredDoctor" value={formData.preferredDoctor} onChange={handleChange} className={inputClass}>
                    <option value="">Any available doctor</option>
                    {doctors.map(d => <option key={d._id} value={d.name}>{d.name}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#193151] flex items-center gap-2"><FileText className="w-5 h-5 text-[#D74552]" />Additional Information</h3>
              <textarea name="symptoms" value={formData.symptoms} onChange={handleChange} rows={4} placeholder="Describe your symptoms or reason for visit..." className={inputClass} />
            </div>
            <div className="space-y-6 pt-6 border-t">
              <label className="flex items-start gap-2 text-sm text-gray-600"><input type="checkbox" required className="mt-1" />I agree to the Terms of Service and Privacy Policy</label>
              <button type="submit" disabled={submitting} className="w-full bg-[#D74552] text-white py-4 rounded-xl text-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50 shadow-lg">
                {submitting ? 'Booking...' : 'Book Appointment'}
              </button>
              <p className="text-center text-sm text-gray-600">We'll contact you within 24 hours. For urgent cases call <span className="text-[#D74552] font-bold">+91 9407459143</span></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
