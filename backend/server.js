// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const registrationRoute = require('./routes/registrationRoute');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Test Route
app.get('/', (req, res) => {
  res.send('I Camp Server');
});

// Main API Route
app.use('/api/v1/register', registrationRoute);

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
