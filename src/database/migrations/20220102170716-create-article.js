'use strict';
import { ArticleStatus } from '../../models/article';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM,
        values: [ArticleStatus.ARCHIVED, ArticleStatus.DRAFT, ArticleStatus.PUBLISHED],
      },
      authorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'author',
          key: 'id',
        },
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'category',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('articles');
  },
};
