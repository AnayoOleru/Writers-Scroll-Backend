/**
 * @swagger
 * definition:
 *
 *  article:
 *    type: object
 *    required:
 *      - id
 *      - user_id
 *      - title
 *      - slug
 *      - abstract
 *      - body
 *      - category
 *      - image_url
 *      - bookmark_count
 *      - likes_count
 *      - is_reported
 *      - is_draft
 *      - reading_time
 *    properties:
 *      id:
 *        type: string
 *        format: uuid
 *      user_id:
 *        type: string
 *        format: uuid
 *      title:
 *        type: string
 *      slug:
 *        type: string
 *      abstract:
 *        type: string
 *      body:
 *        type: string
 *      category:
 *        type: string
 *      image_url:
 *        type: string
 *      bookmark_count:
 *        type: integer
 *      likes_count:
 *        type: integer
 *      is_reported:
 *        type: boolean
 *      is_draft:
 *        type: boolean
 *      reading_time:
 *        type: integer
 */

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    'Article',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      abstract: {
        type: DataTypes.STRING,
      },
      body: {
        type: DataTypes.STRING,
      },
      category: {
        type: DataTypes.STRING,
      },
      image_url: {
        type: DataTypes.STRING,
      },
      bookmark_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      likes_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      is_reported: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_draft: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      reading_time: {
        type: DataTypes.INTEGER,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['title'],
        },
      ],
    }
  );
  Article.associate = models => {
    Article.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'author',
    });

    Article.hasMany(models.Like, {
      foreignKey: 'article_id',
    });

    Article.hasMany(models.Bookmark, {
      foreignKey: 'article_id',
    });

    Article.hasMany(models.Rating, {
      foreignKey: 'article_id',
    });
  };

  return Article;
};
