import mongoose from 'mongoose';

const serviceDetailSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  image: { type: String, default: '' },
  color: { type: String, default: '' },
  procedures: [{ type: String }],
  specialists: { type: Number, default: 0 },
  yearsExperience: { type: Number, default: 0 },
  emergencyAvailable: { type: Boolean, default: false },
  features: [{ type: String }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const ServiceDetail = mongoose.model('ServiceDetail', serviceDetailSchema);
export default ServiceDetail;
