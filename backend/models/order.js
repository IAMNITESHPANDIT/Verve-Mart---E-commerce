module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    orderId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // ...
  });

  Order.associate = (models) => {
    Order.belongsTo(models.Account);
    Order.hasMany(models.OrderItem);
    Order.hasMany(models.Payment);
    Order.hasMany(models.Return);
    // ...
  };

  return Order;
};
