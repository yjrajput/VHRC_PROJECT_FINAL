import React, { useState } from "react";
import { Phone, Calendar, Ambulance, Mail, MessageCircle, Send, Building, MapPin, Printer, Clock, Navigation } from "lucide-react";
import Button from "../ui/Button";
import { UseCustomContext } from "../context/Contex";
import toast from "react-hot-toast";
import { submitContact } from "../API/api";

const Contactpage = () => {
  const { onBookAppointment, handleContactClick, handleDirections } = UseCustomContext();
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', subject: '', department: '', message: '', preferredContact: 'email' });
  const [submitting, setSubmitting] = useState(false);

  const contactMethods = [
    { title: "Main Reception", description: "General inquiries and appointments", icon: Phone, value: "+91 9926009520", action: "Call Now", color: "bg-red-50 text-[#D74552]" },
    { title: "Emergency Department", description: "24/7 emergency services", icon: Ambulance, value: "+91 7688009300", action: "Emergency Call", color: "bg-red-50 text-[#D74552]" },
    { title: "Email Support", description: "General information and feedback", icon: Mail, value: "vijaylaxmihospital.kgn@gmail.com", action: "Send Email", color: "bg-red-50 text-[#D74552]" },
    { title: "Live Chat", description: "Real-time assistance", icon: MessageCircle, value: "Available 9 AM - 6 PM", action: "Start Chat", color: "bg-red-50 text-[#D74552]" },
  ];
  const departments = [
    { name: "General Inquiry" }, { name: "Appointments" }, { name: "Patient Registration" },
    { name: "Billing & Insurance" }, { name: "Medical Records" }, { name: "Patient Relations" },
    { name: "Pharmacy" }, { name: "Laboratory" },
  ];

  const handleOnChange = (e) => setContactForm({ ...contactForm, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitContact(contactForm);
      toast.success('Message sent successfully! We will respond within 24 hours.');
      setContactForm({ name: '', email: '', phone: '', subject: '', department: '', message: '', preferredContact: 'email' });
    } catch (error) {
      toast.error(error.message || 'Failed to send message');
    } finally { setSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-[#193151] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/20 text-white px-4 py-2 rounded-full">
              <Phone className="w-4 h-4" /><span className="text-sm font-medium">Contact Us</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">Get in Touch</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">We're here to help you with any questions or concerns.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button onClick={onBookAppointment} styles="bg-[#D74552] flex items-center justify-center text-lg rounded-xl shadow-lg">
                <Calendar className="w-5 h-5 mr-2" />Book Appointment
              </Button>
              <Button styles="border-2 border-white/20 text-white hover:bg-white hover:text-[#193151] flex items-center justify-center text-lg rounded-xl">
                <Phone className="w-5 h-5 mr-2" />Call Us Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Contact</h2>
            <p className="text-xl text-gray-600">Choose your preferred way to reach us</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div key={index} className="shadow-lg border-0 bg-white hover:shadow-xl transition-all hover:-translate-y-1 rounded-lg">
                  <div className="p-6 text-center space-y-4">
                    <div className={`w-16 h-16 rounded-xl ${method.color} flex items-center justify-center mx-auto`}><Icon className="w-8 h-8" /></div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                      <p className="font-medium text-gray-900 mb-4">{method.value}</p>
                    </div>
                    <button onClick={() => handleContactClick(method.title.toLowerCase().includes('phone') || method.title.includes('Emergency') ? 'phone' : method.title.toLowerCase().includes('email') ? 'email' : 'chat', method.value)}
                      className="w-full bg-[#D74552] hover:bg-opacity-90 active:scale-95 text-white py-2 rounded-lg hover:scale-105 transition-all duration-300 cursor-pointer">{method.action}</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="shadow-xl border-0 bg-white rounded-2xl overflow-hidden">
                <div className="bg-[#193151] text-white">
                  <div className="text-2xl text-center flex items-center justify-center space-x-2 py-5 font-semibold"><Send className="w-6 h-6" /><span>Send us a Message</span></div>
                </div>
                <div className="p-4 sm:p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1.5"><label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name *</label><input id="name" name="name" type="text" placeholder="Enter your full name" value={contactForm.name} onChange={handleOnChange} required className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#193151] focus:border-[#193151] transition-all text-base bg-white shadow-sm" /></div>
                      <div className="space-y-1.5"><label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</label><input id="email" type="email" name="email" placeholder="your.email@example.com" value={contactForm.email} onChange={handleOnChange} required className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#193151] focus:border-[#193151] transition-all text-base bg-white shadow-sm" /></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1.5"><label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</label><input id="phone" type="tel" name="phone" placeholder="+91 1234567890" value={contactForm.phone} onChange={handleOnChange} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#193151] focus:border-[#193151] transition-all text-base bg-white shadow-sm" /></div>
                      <div className="space-y-1.5"><label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject *</label><input id="subject" type="text" name="subject" placeholder="Brief subject" value={contactForm.subject} onChange={handleOnChange} required className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#193151] focus:border-[#193151] transition-all text-base bg-white shadow-sm" /></div>
                    </div>
                    <div className="space-y-1.5"><label htmlFor="department" className="text-sm font-medium text-gray-700">Department</label>
                      <select id="department" name="department" value={contactForm.department} onChange={handleOnChange} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#193151] focus:border-[#193151] transition-all text-base shadow-sm">
                        <option value="">Select department (optional)</option>
                        {departments.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5"><label htmlFor="message" className="text-sm font-medium text-gray-700">Message *</label><textarea id="message" name="message" placeholder="Please describe your question..." value={contactForm.message} onChange={handleOnChange} required rows={5} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#193151] focus:border-[#193151] transition-all text-base bg-white shadow-sm" /></div>
                    <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 bg-[#D74552] hover:bg-opacity-90 text-white py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 font-semibold">
                      <Send className="w-5 h-5" />{submitting ? 'Sending...' : 'Send Message'}
                    </button>
                    <p className="text-center text-sm text-gray-600">We typically respond within 24 hours.</p>
                  </form>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="shadow-lg bg-white rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6"><Building className="w-6 h-6 text-[#193151]" /><h2 className="text-xl font-semibold text-gray-900">Contact Information</h2></div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-[#D74552] mt-1" /><div><p className="font-medium text-gray-900">Main Address</p><p className="text-gray-600">Khargone, Madhya Pradesh</p></div></div>
                  <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-[#D74552]" /><div><p className="font-medium text-gray-900">Main Phone</p><button onClick={() => handleContactClick('phone', '+91 9926009520')} className="text-[#D74552] hover:underline font-semibold">+91 9926009520</button></div></div>
                  <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-[#D74552]" /><div><p className="font-medium text-gray-900">Email</p><button onClick={() => handleContactClick("email", "vijaylaxmihospital.kgn@gmail.com")} className="text-[#D74552] hover:underline font-semibold">vijaylaxmihospital.kgn@gmail.com</button></div></div>
                  <div className="flex items-center gap-3"><Printer className="w-5 h-5 text-gray-500" /><div><p className="font-medium text-gray-900">Fax</p><p className="text-gray-600">+91 9926009520</p></div></div>
                </div>
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <Button onClick={handleDirections} styles="w-full flex items-center justify-center gap-2 bg-[#D74552] hover:bg-opacity-95 text-white py-2.5 rounded-lg"><Navigation className="w-4 h-4" />Get Directions</Button>
                </div>
              </div>
              <div className="shadow-lg bg-white rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6"><Clock className="w-6 h-6 text-[#193151]" /><h2 className="text-xl font-semibold text-gray-900">Operating Hours</h2></div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center"><span className="text-gray-700">Monday - Friday:</span><span className="font-medium text-gray-900">8:00 AM - 8:00 PM</span></div>
                  <div className="flex justify-between items-center"><span className="text-gray-700">Saturday:</span><span className="font-medium text-gray-900">9:00 AM - 5:00 PM</span></div>
                  <div className="flex justify-between items-center"><span className="text-gray-700">Sunday:</span><span className="font-medium text-gray-900">10:00 AM - 4:00 PM</span></div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200"><span className="text-red-600 font-medium">Emergency Department:</span><span className="font-bold text-red-600">24/7</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contactpage;
