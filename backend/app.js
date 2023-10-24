require("dotenv").config();

const express = require("express");

const cors = require("cors");

const app = express();

const { sequelize } = require("./sequelize/index");

const itemRoutes = require("./routes/itemRoutes");

const userRoutes = require("./routes/userRoutes");

const authRoutes = require("./routes/authRoutes");

const addressRoutes = require("./routes/addressRoute");

const paymentRoutes = require("./routes/paymentRoute");

const orderRoutes = require("./routes/orderRoute");

const sliderRoutes = require("./routes/sliderRoute");

const categoryRoute = require("./routes/categoryRoute");

const PORTNUMBER = process.env.PORT_NUMBER || 4000;

app.use(express.json());

// CORS setup: Allow requests from localhost
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the origin of your frontend application
    credentials: true, // Enable cookies and credentials (if needed)
  })
);

// Routes

app.use("/users", userRoutes);

app.use("/auth", authRoutes);

app.use("/items", itemRoutes);

app.use("/address", addressRoutes);

app.use("/payment", paymentRoutes);

app.use("/order", orderRoutes);

app.use("/slider", sliderRoutes);

app.use("/category", categoryRoute);

// Sync the models with the database and start the server
sequelize
  .sync()
  .then(() => {
    app.listen(PORTNUMBER, () => {
      console.log(`Server running on port ${PORTNUMBER}`);
    });
  })
  .catch((error) => {
    console.log("Error syncing models: ", error);
  });
