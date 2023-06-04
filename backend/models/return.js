module.exports = (sequelize, DataTypes) => {
  const Return = sequelize.define("Return", {
    returnId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // ...
  });

  Return.associate = (models) => {
    Return.belongsTo(models.Order);
    Return.hasMany(models.ReturnLineItem);
    // ...
  };

  return Return;
};
