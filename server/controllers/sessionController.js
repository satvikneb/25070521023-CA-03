const Session = require('../models/Session');

const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user._id }).sort({ scheduledDate: 1 });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSession = async (req, res) => {
  try {
    const { skillTitle, partnerName, scheduledDate } = req.body;
    if (!skillTitle || !partnerName || !scheduledDate) {
      return res.status(400).json({ message: 'Please fill all session fields' });
    }
    const session = await Session.create({
      skillTitle,
      partnerName,
      scheduledDate,
      user: req.user._id,
    });
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: 'Session not found' });
    if (session.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await session.deleteOne();
    res.status(200).json({ message: 'Session removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSessions, createSession, deleteSession };