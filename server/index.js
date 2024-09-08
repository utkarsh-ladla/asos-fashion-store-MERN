

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UsersModel =require('./models/User') 

const app = express();
app.use(express.json());

app.use(cors(
  {
    origin: ["https://asos-fashion-store-mern.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }
  
));
app.use(cors(corsOptions));
app.options('*', cors()); // Handle preflight requests for all routes



// Creating connection with mongoose
mongoose.connect("mongodb+srv://utkarshladla:Utkarsh%404660@cluster0.gegw5.mongodb.net/asos")
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err.message)
);

app.get("/", (req, res) => {
  res.json("Hello");
})

// for Login 
app.post('/login', async (req, res) => {
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