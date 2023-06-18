module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("Item", {
    itemId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sku: DataTypes.STRING,
    itemName: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    stock: DataTypes.INTEGER,
    reviewStars: DataTypes.FLOAT,
    size: DataTypes.STRING,
    color: DataTypes.STRING,
    image: DataTypes.STRING,
  });

  Item.associate = (models) => {
    Item.hasMany(models.OrderItem);
    Item.belongsTo(models.User, { foreignKey: "UserId" });
    // ...
  };

  return Item;
};
