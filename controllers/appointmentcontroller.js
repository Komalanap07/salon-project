const db = require('../config/db');

// Create a new appointment
const createAppointment = (req, res) => {
  const { user_id, service_id, appointment_date } = req.body;

  const query = `
    INSERT INTO appointments (user_id, service_id, appointment_date)
    VALUES (?, ?, ?)
  `;
  db.query(query, [user_id, service_id, appointment_date], (err, result) => {
    if (err) {
      return res.status(500).send("Error creating appointment");
    }
    res.status(201).send({ message: "Appointment created successfully", appointmentId: result.insertId });
  });
};

// View all appointments
const getAppointments = (req, res) => {
  const query = `
    SELECT appointments.*, users.username, services.service_name 
    FROM appointments
    JOIN users ON appointments.user_id = users.user_id
    JOIN services ON appointments.service_id = services.service_id
  `;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Error retrieving appointments");
    }
    res.json(results);
  });
};

// Update an appointment
const updateAppointment = (req, res) => {
  const { appointment_id } = req.params;
  const { appointment_date, status } = req.body;

  const query = `
    UPDATE appointments SET appointment_date = ?, status = ? 
    WHERE appointment_id = ?
  `;
  db.query(query, [appointment_date, status, appointment_id], (err, result) => {
    if (err) {
      return res.status(500).send("Error updating appointment");
    }
    res.send("Appointment updated successfully");
  });
};

// Cancel an appointment
const cancelAppointment = (req, res) => {
  const { appointment_id } = req.params;

  const query = `
    UPDATE appointments SET status = 'canceled'
    WHERE appointment_id = ?
  `;
  db.query(query, [appointment_id], (err, result) => {
    if (err) {
      return res.status(500).send("Error canceling appointment");
    }
    res.send("Appointment canceled successfully");
  });
};

module.exports = { createAppointment, getAppointments, updateAppointment, cancelAppointment };
