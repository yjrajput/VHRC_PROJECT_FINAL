import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  subject: { type: String, required: true },
  department: { type: String, default: '' },
  message: { type: String, required: true },
  preferredContact: { type: String, default: 'email' },
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
