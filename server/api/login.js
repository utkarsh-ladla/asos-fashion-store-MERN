const connectToDB = require('../utils/db');
const UsersModel = require('../models/User');

module.exports = async (req, res) => {
  await connectToDB();

  if (req.method === 'POST') {
    const { Email, Password } = req.body;

    try {
      const user = await UsersModel.findOne({ email: Email });

      if (user) {
        if (user.Password === Password) {
          return res.status(200).json({ message: "Login successful" });
        } else {
          return res.status(401).json({ error: "Incorrect password" });
        }
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
};
