module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("Payment", {
    paymentId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // ...
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.Order);
    // ...
  };

  return Payment;
};
