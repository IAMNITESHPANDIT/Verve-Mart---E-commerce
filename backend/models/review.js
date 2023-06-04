module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    reviewId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // ...
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User);
    // ...
  };

  return Review;
};
