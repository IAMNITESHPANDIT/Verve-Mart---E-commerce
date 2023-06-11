const jwt = require("jsonwebtoken");
const { User } = require("../sequelize/index");
const jwtSecret = process.env.JWT_SECRET;

exports.authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization");
  console.log("method triggred", token);
  if (!token) {
    return res.status(401).json({ error: "Authorization token not found" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.userId;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Add the user to the request object
    req.user = user;
    next();
  } catch (error) {
    console.log("Authentication error: ", error);
    res.status(401).json({ error: "Authentication failed" });
  }
};
