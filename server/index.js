// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const UsersModel = require("./models/User");

const app = express();

// CORS settings
const corsOptions = {
  origin: ['https://asos-fashion-store-mern.vercel.app', 'http://localhost:5173'], // Allow both your deployed app and localhost
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json());

// Database connection
mongoose.connect("mongodb+srv://utkarshladla:Utkarsh%404660@cluster0.gegw5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// Default route
app.get('/', (req, res) => {
  res.json("Welcome to ASOS Fashion Store");
});

// API route for user login
app.post('/api/login', async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const user = await UsersModel.findOne({ email: Email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.Password !== Password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    return res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// API route for user registration
app.post('/api/register', async (req, res) => {
  const { name, email, Password } = req.body;

  try {
    const user = await UsersModel.create({ name, email, Password });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: 'Error registering user', details: error });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
