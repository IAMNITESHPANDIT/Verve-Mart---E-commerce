module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("Payment", {
    paymentId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    cardLastFour: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    addressId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.Order, {
      foreignKey: "orderId",
    });
  };

  return Payment;
};
