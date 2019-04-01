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
    research_field: {
      type: DataTypes.STRING,
    },
  });
  return User;
};
