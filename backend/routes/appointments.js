import express from 'express';
import Appointment from '../models/Appointment.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// GET /api/appointments - Admin only
router.get('/', protect, async (req, res) => {
  try {
    const { status, department, date } = req.query;
    const filter = {};
    if (status && status !== 'all') filter.status = status;
    if (department && department !== 'all') filter.department = department;
    if (date) filter.date = date;

    const appointments = await Appointment.find(filter).sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/appointments/stats - Admin only
router.get('/stats', protect, async (req, res) => {
  try {
    const total = await Appointment.countDocuments();
    const pending = await Appointment.countDocuments({ status: 'pending' });
    const confirmed = await Appointment.countDocuments({ status: 'confirmed' });
    const completed = await Appointment.countDocuments({ status: 'completed' });
    const cancelled = await Appointment.countDocuments({ status: 'cancelled' });

    const today = new Date().toISOString().split('T')[0];
    const todayCount = await Appointment.countDocuments({ date: today });

    res.json({ total, pending, confirmed, completed, cancelled, todayCount });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/appointments - Public
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, date, timeSlot, department } = req.body;
    if (!firstName || !lastName || !email || !phone || !date || !timeSlot || !department) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }
    const appointment = await Appointment.create(req.body);
    res.status(201).json({ message: 'Appointment booked successfully!', appointment });
  } catch (error) {
    res.status(400).json({ message: 'Failed to book appointment', error: error.message });
  }
});

// PUT /api/appointments/:id - Admin (update status)
router.put('/:id', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
});

// DELETE /api/appointments/:id - Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
