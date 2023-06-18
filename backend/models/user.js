const CartItem = require("./CartItem");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    registrationNumber: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  });

  User.prototype.getCartItem = async function (itemId) {
    const cartItem = await CartItem.findOne({
      where: { itemId, userId: this.id },
    });
    return cartItem;
  };

  User.prototype.removeCartItem = async function (cartItem) {
    await cartItem.destroy();
  };

  User.associate = (models) => {
    User.hasOne(models.Account);
    User.hasMany(models.Review);
    User.hasMany(models.CreditCard);
    User.hasMany(models.CartItem, { foreignKey: "userId" });
    // ...
  };

  return User;
};
