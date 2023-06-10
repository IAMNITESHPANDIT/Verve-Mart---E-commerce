module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING, // Added password field
    registrationNumber: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  });

  User.associate = (models) => {
    User.hasOne(models.Account);
    User.hasMany(models.Review);
    User.hasMany(models.CreditCard);
    // ...
  };

  return User;
};
