const express = require("express");
const path = require('path');
const cors = require("cors");

const app = express();

// CORS settings
const corsOptions = {
  origin: 'https://asos-fashion-store-mern.vercel.app',
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Default route
app.get('/', (req, res) => {
  res.json("Welcome to ASOS Fashion Store");
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
