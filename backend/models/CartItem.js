module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define("CartItem", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    itemId: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
    },
  });

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.User, { foreignKey: "userId" });
    CartItem.belongsTo(models.Item, { foreignKey: "itemId" });
  };

  return CartItem;
};
