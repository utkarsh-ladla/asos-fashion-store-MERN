// const mongoose = require("mongoose");

// // Creating connection with mongoose
// // mongoose.connect("mongodb+srv://utkarshladla:Utkarsh%404660@cluster0.gegw5.mongodb.net/asos")
// mongoose.connect("mongodb+srv://utkarshladla:Utkarsh%404660@cluster0.gegw5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
// // mongoose.connect("mongodb+srv://utkarshladla:Utkarsh%404660@cluster0.gegw5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
// .then(() => console.log("MongoDB connected successfully"))
// .catch(err => console.error("MongoDB connection error:", err.message)
// );

const mongoose = require('mongoose');

let isConnected = false; // Track the connection status

const connectToDB = async () => {
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }

  const MONGO_URI = mongoose.connect("mongodb+srv://utkarshladla:Utkarsh%404660@cluster0.gegw5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0;")

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("=> MongoDB connected");
  } catch (error) {
    console.error("=> MongoDB connection failed:", error);
    throw new Error("MongoDB connection error");
  }
};

module.exports = connectToDB;
