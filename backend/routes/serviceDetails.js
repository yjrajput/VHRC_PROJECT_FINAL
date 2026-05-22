import express from 'express';
import ServiceDetail from '../models/ServiceDetail.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// GET /api/service-details - Public
router.get('/', async (req, res) => {
  try {
    const serviceDetails = await ServiceDetail.find({ isActive: true }).sort({ createdAt: 1 });
    res.json(serviceDetails);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/service-details/all - Admin
router.get('/all', protect, async (req, res) => {
  try {
    const serviceDetails = await ServiceDetail.find().sort({ createdAt: -1 });
    res.json(serviceDetails);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/service-details - Admin
router.post('/', protect, async (req, res) => {
  try {
    const serviceDetail = await ServiceDetail.create(req.body);
    res.status(201).json(serviceDetail);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
});

// PUT /api/service-details/:id - Admin
router.put('/:id', protect, async (req, res) => {
  try {
    const serviceDetail = await ServiceDetail.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!serviceDetail) return res.status(404).json({ message: 'Service detail not found' });
    res.json(serviceDetail);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
});

// DELETE /api/service-details/:id - Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const serviceDetail = await ServiceDetail.findByIdAndDelete(req.params.id);
    if (!serviceDetail) return res.status(404).json({ message: 'Service detail not found' });
    res.json({ message: 'Service detail deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
