const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../sequelize/index");
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

//Login and Register role with password - admin

exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin user with the provided data
    const adminUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      phoneNumber,
    });

    // Generate a JWT token with the user's information
    const token = jwt.sign(
      { userId: adminUser.userId, role: adminUser.role },
      jwtSecret
    );

    res.status(201).json({
      message: "Admin user registered successfully",
      data: adminUser,
      token: token,
    });
  } catch (error) {
    console.log("Error registering admin user: ", error);
    res.status(500).json({ error: "Failed to register admin user" });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if required fields are present
    if (!email || !password) {
      return res.status(400).json({ error: "Email or password is missing" });
    }

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
    const token = jwt.sign({ userId: user.dataValues.userId }, jwtSecret, {
      expiresIn: "1h",
    });

    // Return the user and token
    res.json({ user, token });
  } catch (error) {
    // Handle login error
    console.log("Login error: ", error);
    res.status(500).json({ error: "Failed to log in" });
  }
};

exports.loginUser = async (req, res) => {

  try {
    const { email, password } = req.body;

    // Check if required fields are present
    if (!email || !password) {
      return res.status(400).json({ error: "Email or password is missing" });
    }

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
    const token = jwt.sign({ userId: user.dataValues.userId }, jwtSecret, {
      expiresIn: "1h",
    });

    // Return the user and token
    let cloneUser = JSON.stringify(user);
    let resultUser = JSON.parse(cloneUser);
    resultUser.token = token;

    res.json({ message: "User logged in successfully", data: resultUser });
  } catch (error) {
    // Handle login error
    res.status(500).json({ message: "Failed to log in" });
  }
};

exports.signupUser = async (req, res) => {
  try {
    const { name, phoneNumber, email, password } = req.body;

    // Check if required fields are present
    if (!name || !phoneNumber || !email || !password) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
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
    const token = jwt.sign({ userId: user?.id }, jwtSecret, {
      expiresIn: "1h",
    });
    // Return the created user and token
    res
      .status(201)
      .json({ user, token, message: "User is Created Successfully" });
  } catch (error) {
    // Handle registration error
    console.log("User registration error: ", error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("Error logging out: ", error);
    res.status(500).json({ error: "Failed to logout" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { name, email, phoneNumber } = req.body;

    // Find the user by userId
    const user = await User.findOne({ where: { userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    await user.save();

    return res
      .status(200)
      .json({ message: "User details updated successfully", data: user });
  } catch (error) {
    console.log("Error updating user details:", error);
    return res.status(500).json({ error: "Failed to update user details" });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findOne({ where: { userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userDetails = {
      name: user.name,
      email: user.email,
      phone: user.phoneNumber,
    };
    return res.status(200).json({
      message: "User details fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    console.log("Error fetching user details:", error);
    return res.status(500).json({ error: "Failed to fetch user details" });
  }
};
