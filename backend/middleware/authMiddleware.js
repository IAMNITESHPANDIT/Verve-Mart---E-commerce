const jwt = require("jsonwebtoken");
const { User } = require("../sequelize/index");
const jwtSecret = process.env.JWT_SECRET;

exports.authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Authorization token not found" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.userId;
    console.log("userId", decoded);
    const user = await User.findByPk(userId);

    if (!user) {
      return res
        .status(401)
        .json({ error: "User not found", data: "not found" });
    }

    // Add the user to the request object
    req.user = user;
    next();
  } catch (error) {
    console.log("Authentication error: ", error);
    res.status(401).json({ error: "Authentication failed" });
  }
};
// authMiddleware.js

exports.isAdmin = async (req, res, next) => {
  try {
    // Get the JWT token from the request headers
    const token = req.headers.authorization;

    // Verify and decode the JWT token
    const decodedToken = jwt.verify(token, jwtSecret);

    // Get the user ID from the decoded token
    const userId = decodedToken.userId;

    // Fetch the user from the database
    const user = await User.findOne({ where: { userId } });

    // Check if the user has the admin role
    if (user.role !== "admin") {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    // Set the user object in the request for future use
    req.user = user;

    // Call the next middleware
    next();
  } catch (error) {
    console.log("Error validating admin access: ", error);
    res.status(500).json({ error: "Failed to validate admin access" });
  }
};
