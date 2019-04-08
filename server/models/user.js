import authHelpers from '../helpers/auth';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    bio: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 8,
          msg: 'password length must be at least 8 characters long',
        },
      },
    },
    is_activated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_reviewer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_reported: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_notified: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    research_field: {
      type: DataTypes.STRING,
    },
    social: {
      type: DataTypes.ENUM('facebook', 'twitter', 'google', 'local'),
      allowNull: true,
    },
  });
  User.beforeCreate(user => {
    user.password = authHelpers.hashPassword(user.password);
  });
  User.beforeUpdate(user => {
    user.password = authHelpers.hashPassword(user.password);
  });

  User.associate = models => {
    const { Follower } = models;

    User.hasMany(Follower, {
      foreignKey: 'followee_id',
      as: 'followee',
    });

    User.hasMany(Follower, {
      foreignKey: 'follower_id',
      as: 'follower',
    });
  };
  return User;
};
