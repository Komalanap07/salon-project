const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const imageRoutes = require('./routes/imageroutes');
const ownerRoutes = require('./routes/ownerroutes');
const serviceRoutes = require('./routes/serviceroutes');
const userRoutes = require('./routes/userroutes');
const appointmentRoutes = require('./routes/appointmentroutes');
const salonRoutes = require('./routes/topsalonroutes');
const signupRoutes = require('./routes/signuproutes');
const locationroutes = require('./routes/locationroutes');


const app = express();
app.use(cors());

app.use(express.json());
app.use(bodyParser.json());


// Image routes
app.use('/api/images', imageRoutes);

// Owner routes
app.use('/api/owners', ownerRoutes);

// service routes
app.use('/api/service', serviceRoutes);

//user routes
app.use('/api/user', userRoutes);

//appointment routes
app.use('/api/appointment', appointmentRoutes);

app.use('/api/salons', salonRoutes);

app.use('/api/signup', signupRoutes);

// Use the location routes
app.use('/api', locationroutes);

module.exports = app;

