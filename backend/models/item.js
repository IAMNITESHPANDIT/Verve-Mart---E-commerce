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
    categoryImage: DataTypes.STRING,
    subCategory: DataTypes.STRING,
  });

  Item.associate = (models) => {
    Item.hasMany(models.OrderItem);
    Item.belongsTo(models.User, { foreignKey: "UserId" });
    Item.belongsTo(models.Category, { foreignKey: "categoryId" });
  };

  Item.afterCreate(async (item, options) => {
    const { Category } = sequelize.models;

    try {
      // Find or create the category based on the item's category name
      console.log("category------D*****ev", Category);
      const [category, created] = await Category.findOrCreate({
        where: { name: item.category, image: item.categoryImage },
        defaults: { name: item.category, image: item.categoryImage },
      });

      // If the category was created, update the item's categoryId property
      if (created) {
        item.categoryId = category.id;
        await item.save();
      }
    } catch (error) {
      console.log("Error adding item to category:", error);
    }
  });

  return Item;
};
