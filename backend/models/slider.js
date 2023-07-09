module.exports = (sequelize, DataTypes) => {
  const Slider = sequelize.define("Slider", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  //   Slider.associate = (models) => {
  //     Slider.belongsTo(models.item, { foreignKey: "userId" });
  //   };

  return Slider;
};
