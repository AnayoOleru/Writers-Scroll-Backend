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
    isactivated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    imageurl: {
      type: DataTypes.STRING,
    },
    isadmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isreviewer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isreported: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    research_field: {
      type: DataTypes.STRING,
    },
  });
  return User;
};
