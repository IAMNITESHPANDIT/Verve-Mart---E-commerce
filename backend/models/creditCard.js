module.exports = (sequelize, DataTypes) => {
  const CreditCard = sequelize.define("CreditCard", {
    cardId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // ...
  });

  CreditCard.associate = (models) => {
    CreditCard.belongsTo(models.User);
    // ...
  };

  return CreditCard;
};
