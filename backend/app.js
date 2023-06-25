require("dotenv").config();

const express = require("express");

const app = express();

const { sequelize } = require("./sequelize/index");

const itemRoutes = require("./routes/itemRoutes");

const userRoutes = require("./routes/userRoutes");

const authRoutes = require("./routes/authRoutes");

const addressRoutes = require("./routes/addressRoutes");

const paymentRoutes = require("./routes/paymentRoute");

const PORTNUMBER = 3000;

app.use(express.json());

// Routes

app.use("/users", userRoutes);

app.use("/auth", authRoutes);

app.use("/items", itemRoutes);

app.use("/address", addressRoutes);

app.use("/payment", paymentRoutes);

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
