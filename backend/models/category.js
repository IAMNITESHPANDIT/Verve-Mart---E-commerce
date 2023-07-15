module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    categoryId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    image: DataTypes.STRING,
  });

  Category.associate = (models) => {
    Category.hasMany(models.Item, { foreignKey: "categoryId" });
  };

  return Category;
};
