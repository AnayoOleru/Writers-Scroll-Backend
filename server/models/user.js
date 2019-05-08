import authHelpers from '../helpers/auth';

/**
 * @swagger
 * definition:
 *  login:
 *    type: object
 *    required:
 *      - username
 *      - passoword
 *    properties:
 *      email:
 *        type: string
 *      password:
 *        type: string
 *  signup:
 *    type: object
 *    required:
 *      - firstname
 *      - lastname
 *      - email
 *      - password
 *    properties:
 *      firstname:
 *        type: string
 *      lastname:
 *        type: string
 *      email:
 *        type: string
 *      password:
 *        type: string
 *  password-reset:
 *    type: object
 *    required:
 *      - email
 *    properties:
 *      email:
 *        type: string
 *  update-password:
 *    type: object
 *    required:
 *      - password
 *      - confirmPassword
 *    properties:
 *      password:
 *        type: string
 *      confirmPassword:
 *        type: string
 *  profile:
 *    type: object
 *    required:
 *      - first_name
 *      - last_name
 *      - email
 *      - title
 *      - bio
 *      - image_url
 *      - research_field
 *    properties:
 *      firstname:
 *        type: string
 *      lastname:
 *        type: string
 *      email:
 *        type: string
 *      title:
 *        type: string
 *      bio:
 *        type: string
 *      image_url:
 *        type: string
 *      research_field:
 *        type: string
 */

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
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
      is_requested: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      social: {
        type: DataTypes.ENUM('facebook', 'twitter', 'google', 'local'),
        allowNull: true,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['first_name', 'last_name'],
        },
      ],
    }
  );
  User.beforeCreate(user => {
    user.password = authHelpers.hashPassword(user.password);
  });

  User.associate = models => {
    const { Follower, Article } = models;

    User.hasMany(Follower, {
      foreignKey: 'followee_id',
      as: 'followee',
    });

    User.hasMany(Follower, {
      foreignKey: 'follower_id',
      as: 'follower',
    });
    User.hasMany(Article, {
      foreignKey: 'user_id',
      as: 'author',
    });
  };
  return User;
};
