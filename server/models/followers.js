'use strict';
module.exports = (sequelize, DataTypes) => {
  const Followers = sequelize.define('Follower', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    follower_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    followee_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
  Followers.associate = models =>
    Followers.belongsTo(models.User, {
      foreignKey: 'id',
    });
  return Followers;
};
