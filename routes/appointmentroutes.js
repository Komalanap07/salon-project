const express = require('express');
const {
  createAppointment,
  getAppointments,
  updateAppointment,
  cancelAppointment
} = require('../controllers/appointmentcontroller');

const router = express.Router();

// Route to create a new appointment
router.post('/', createAppointment);

// Route to get all appointments
router.get('/', getAppointments);

// Route to update an appointment
router.put('/:appointment_id', updateAppointment);

// Route to cancel an appointment
router.patch('/:appointment_id/cancel', cancelAppointment);

module.exports = router;
