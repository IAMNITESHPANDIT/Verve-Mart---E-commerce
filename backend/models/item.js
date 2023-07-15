module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("Item", {
    itemId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
  };

  Item.afterCreate(async (item, options) => {
    const { Category } = sequelize.models;

    try {
      // Check if the category already exists
      const category = await Category.findOne({
        where: { name: item.category },
      });

      if (category) {
        // If the category exists, associate the item with it
        await item.setCategory(category);
      } else {
        // If the category does not exist, create it and associate it with the item
        const newCategory = await Category.create({
          name: item.category,
          image: item.categoryImage,
          categoryId: item.categoryId,
        });
        await item.setCategory(newCategory);
      }
    } catch (error) {
      console.log("Error adding item to category:", error);
    }
  });

  return Item;
};
