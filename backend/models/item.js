module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("Item", {
    itemId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // ...
  });

  Item.associate = (models) => {
    Item.hasMany(models.OrderItem);
    // ...
  };

  return Item;
};
