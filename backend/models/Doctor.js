import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  image: { type: String, default: '' },
  experience: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  education: { type: String, default: '' },
  specialties: [{ type: String }],
  location: { type: String, default: '' },
  availability: { type: String, default: '' },
  department: { type: String, required: true },
  languages: [{ type: String }],
  certifications: [{ type: String }],
  bio: { type: String, default: '' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
