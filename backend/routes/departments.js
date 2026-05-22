import express from 'express';
import Department from '../models/Department.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// GET /api/departments - Public
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find({ isActive: true }).sort({ createdAt: 1 });
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/departments/all - Admin
router.get('/all', protect, async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/departments - Admin
router.post('/', protect, async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
});

// PUT /api/departments/:id - Admin
router.put('/:id', protect, async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.json(department);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
});

// DELETE /api/departments/:id - Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
