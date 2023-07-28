module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    orderId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    addressId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.Account);
    Order.hasMany(models.OrderItem);
    Order.hasMany(models.Payment);
    Order.hasMany(models.Return);
  };

  return Order;
};
