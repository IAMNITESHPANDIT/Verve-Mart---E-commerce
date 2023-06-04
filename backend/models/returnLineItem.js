module.exports = (sequelize, DataTypes) => {
  const ReturnLineItem = sequelize.define("ReturnLineItem", {
    returnLineItemId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // ...
  });

  ReturnLineItem.associate = (models) => {
    ReturnLineItem.belongsTo(models.Return);
    // ...
  };

  return ReturnLineItem;
};
