const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const jwt = require('jsonwebtoken'); 

// This secret must be the same as in your other route files
const jwtSecret = 'ankaeshika';

// Middleware to get user ID from token
const getUserIdFromToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authorization token not found.' });
  }

  const tokenValue = token.split(' ')[1];
  try {
    const decodedToken = jwt.verify(tokenValue, jwtSecret);
    req.userId = decodedToken.id; 
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

// ADD APPOINTMENT ROUTE
router.post('/', getUserIdFromToken, async (req, res) => {
  try {
    const appointmentData = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $push: { appointments: appointmentData } },
      { new: true, useFindAndModify: false }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ message: 'Appointment added successfully.', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// GET ALL APPOINTMENTS ROUTE
router.get('/', getUserIdFromToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('appointments');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(user.appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// GET SINGLE APPOINTMENT ROUTE
router.get('/:appointmentId', getUserIdFromToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const appointment = user.appointments.find(a => a._id.toString() === req.params.appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found for this user.' });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// UPDATE APPOINTMENT ROUTE
router.patch('/:appointmentId', getUserIdFromToken, async (req, res) => {
  try {
    const updatedAppointmentData = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.userId, 'appointments._id': req.params.appointmentId },
      { $set: { 'appointments.$': updatedAppointmentData } },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'Appointment or User not found.' });
    }
    res.status(200).json({ message: 'Appointment updated successfully.', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// DELETE APPOINTMENT ROUTE
router.delete('/:appointmentId', getUserIdFromToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $pull: { appointments: { _id: req.params.appointmentId } } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;