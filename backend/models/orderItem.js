module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define("OrderItem", {
    orderItemId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // ...
  });

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Item);
    OrderItem.belongsTo(models.Order);
    // ...
  };

  return OrderItem;
};
