const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UsersModel =require('./models/User') 


const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173', // Allow only localhost for local testing
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions));


// Creating connection with mongoose
mongoose.connect("mongodb+srv://utkarshladla:Utkarsh%404660@cluster0.gegw5.mongodb.net/asos")
// mongoose.connect("mongodb+srv://utkarshladla:Utkarsh%404660@cluster0.gegw5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err.message)
);

app.get("/", (req, res) => {
  res.json("Hello");
})

const path = require('path');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Catch-all handler to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


// for Login 
app.post('/login', async (req, res) => {
  // console.log("Login route hit, request body:", req.body);
  try {
    const { Email, Password } = req.body;
    const user = await UsersModel.findOne({  email: Email });

    if (user) {
      if (user.Password === Password) {
        res.json("success");
      } else {
        res.status(401).json("The password is incorrect");
      }
    } else {
      res.status(404).json("No record exists");
    }
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json("Server error");
  }
});


// API route for user registration
app.post('/register', (req, res) => {
  const { name, email, Password } = req.body;

  UsersModel.create({ name, email, Password })
      .then(user => res.status(201).json({ message: 'User registered successfully', user }))
      .catch(error => res.status(400).json({ error: 'Error registering user', details: error }));
});


const PORT = process.env.PORT || 3001; // Change to an available port
app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });