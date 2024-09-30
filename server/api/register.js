const connectToDB = require('../utils/db');
const UsersModel = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  await connectToDB();

  if (req.method === 'POST') {
    const { name, email, Password } = req.body;

    try {
      // Encrypt password
      const hashedPassword = await bcrypt.hash(Password, 10);
      const user = await UsersModel.create({
        name,
        email,
        Password: hashedPassword
      });

      return res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      return res.status(400).json({ error: "Error registering user", details: error });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
};
