import express from 'express';
import ContactModel from '../models/Contact.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// POST /api/contact - Public
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }
    const contact = await ContactModel.create(req.body);
    res.status(201).json({ message: 'Message sent successfully!', contact });
  } catch (error) {
    res.status(400).json({ message: 'Failed to send message', error: error.message });
  }
});

// GET /api/contact - Admin only
router.get('/', protect, async (req, res) => {
  try {
    const contacts = await ContactModel.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /api/contact/:id - Admin (mark as read)
router.put('/:id', protect, async (req, res) => {
  try {
    const contact = await ContactModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
});

// DELETE /api/contact/:id - Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const contact = await ContactModel.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
