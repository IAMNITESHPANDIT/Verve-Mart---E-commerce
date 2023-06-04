const { Sequelize } = require("sequelize");

const DBNAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(DBNAME, DB_USER, DB_PASSWORD, {
  host: "localhost",
  dialect: "postgres",
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

module.exports = sequelize;
