module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define("Account", {
    accountId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    logonId: DataTypes.STRING,
    password: DataTypes.STRING,
    creationDate: DataTypes.DATE,
    accountType: DataTypes.ENUM("personal", "business"),
  });

  Account.associate = (models) => {
    Account.belongsTo(models.User);
    Account.hasMany(models.Order);
    // ...
  };

  return Account;
};
