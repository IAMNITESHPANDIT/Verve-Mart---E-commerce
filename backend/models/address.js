// address.js

module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define("Address", {
    addressId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    street: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    dist: DataTypes.STRING,
    pincode: DataTypes.STRING,
    userId: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
  });

  Address.associate = (models) => {
    Address.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Address;
};
