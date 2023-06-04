const { Sequelize } = require("sequelize");
const sequelize = require("../sequelize/config/database");

const UserModel = require("./user");
const AccountModel = require("./account");
// ...

const User = UserModel(sequelize, Sequelize);
const Account = AccountModel(sequelize, Sequelize);
// ...

module.exports = {
  User,
  Account,
  // ...
};
