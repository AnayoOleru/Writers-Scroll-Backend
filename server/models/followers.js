'use strict';
export default (sequelize, DataTypes) => {
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
  Followers.associate = models => {
    const { User } = models;

    Followers.belongsTo(User, {
      foreignKey: 'followee_id',
      as: 'followee',
    });

    Followers.belongsTo(User, {
      foreignKey: 'follower_id',
      as: 'follower',
    });
  };
  return Followers;
};
