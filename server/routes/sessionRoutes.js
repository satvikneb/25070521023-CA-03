const express = require('express');
const router = express.Router();
const { getSessions, createSession, deleteSession } = require('../controllers/sessionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getSessions).post(protect, createSession);
router.route('/:id').delete(protect, deleteSession);

module.exports = router;