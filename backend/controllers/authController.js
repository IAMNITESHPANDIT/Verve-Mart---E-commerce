const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../sequelize/index");
const { jwtSecret } = require("../config/config");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: "1h" });

    // Return the user and token
    res.json({ user, token });
  } catch (error) {
    // Handle login error
    console.log("Login error: ", error);
    res.status(500).json({ error: "Failed to log in" });
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, phoneNumber, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record
    const user = await User.create({
      name,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, jwtSecret, {
      expiresIn: "1h",
    });

    // Return the created user and token
    res.status(201).json({ user, token });
  } catch (error) {
    // Handle registration error
    console.log("User registration error: ", error);
    res.status(500).json({ error: "Failed to register user" });
  }
};
