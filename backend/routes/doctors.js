import express from 'express';
import Doctor from '../models/Doctor.js';
import protect from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import sharp from 'sharp';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

// Helper to parse doctor body from FormData (handles arrays and type casting)
const parseDoctorBody = (body) => {
  const toArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val.filter(Boolean);
    return val.split(',').map(s => s.trim()).filter(Boolean);
  };

  return {
    name: body.name,
    specialty: body.specialty,
    experience: body.experience,
    department: body.department,
    education: body.education || '',
    location: body.location || '',
    availability: body.availability || '',
    bio: body.bio || '',
    rating: Number(body.rating) || 0,
    reviews: Number(body.reviews) || 0,
    isActive: body.isActive === 'false' ? false : Boolean(body.isActive ?? true),
    specialties: toArray(body.specialties),
    languages: toArray(body.languages),
    certifications: toArray(body.certifications),
    ...(body.image && { image: body.image }),
  };
};

// GET /api/doctors - Public
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/doctors/all - Admin (includes inactive)
router.get('/all', protect, async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/doctors/:id
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/doctors - Admin
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    if (req.file) {
      const processedBuffer = await sharp(req.file.buffer)
        .resize({ width: 800, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'vhrc_hospital/doctors', resource_type: 'image' },
          (error, res) => { if (error) reject(error); else resolve(res); }
        ).end(processedBuffer);
      });
      req.body.image = result.secure_url;
    }

    const doctorData = parseDoctorBody(req.body);
    const doctor = await Doctor.create(doctorData);
    res.status(201).json(doctor);
  } catch (error) {
    console.error('❌ Create doctor error:', error.message);
    res.status(400).json({ message: error.message || 'Invalid data' });
  }
});

// PUT /api/doctors/:id - Admin
router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    if (req.file) {
      const processedBuffer = await sharp(req.file.buffer)
        .resize({ width: 800, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'vhrc_hospital/doctors', resource_type: 'image' },
          (error, res) => { if (error) reject(error); else resolve(res); }
        ).end(processedBuffer);
      });
      req.body.image = result.secure_url;
    }

    const doctorData = parseDoctorBody(req.body);
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, doctorData, { new: true, runValidators: true });
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (error) {
    console.error('❌ Update doctor error:', error.message);
    res.status(400).json({ message: error.message || 'Invalid data' });
  }
});

// DELETE /api/doctors/:id - Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
