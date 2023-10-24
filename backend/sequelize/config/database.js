const { Sequelize } = require("sequelize");

const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL || '';

const sequelize = new Sequelize(DB_CONNECTION_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Use this option if you encounter self-signed certificate issues
    },
  },
  logging: false, // Disable logging SQL queries (optional)
});

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testDatabaseConnection();

module.exports = {
  sequelize,
  DB_CONNECTION_URL
};

