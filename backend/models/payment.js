module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("Payment", {
    paymentId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Payment.createPayment = async (paymentData) => {
    try {
      const payment = await Payment.create(paymentData);
      return payment;
    } catch (error) {
      throw error;
    }
  };

  Payment.associate = (models) => {
    Payment.belongsTo(models.Order, {
      foreignKey: "orderId",
    });
  };

  return Payment;
};
