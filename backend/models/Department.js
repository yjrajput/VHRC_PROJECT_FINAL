import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  image: { type: String, default: '' },
  color: { type: String, default: '' },
  stats: {
    patients: { type: String, default: '' },
    response: { type: String, default: '' },
    staff: { type: String, default: '' },
    availability: { type: String, default: '' }
  },
  services: [{ type: String }],
  facilities: [{ type: String }],
  contactInfo: {
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    director: { type: String, default: '' }
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Department = mongoose.model('Department', departmentSchema);
export default Department;
