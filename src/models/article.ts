'use strict';
import { Model } from 'sequelize';

export const enum ArticleStatus {
  DRAFT = 'draft',
  ARCHIVED = 'archived',
  PUBLISHED = 'published',
}

interface ArticleAttributes {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  status: ArticleStatus;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Article extends Model<ArticleAttributes> implements ArticleAttributes {
    id!: number;
    title!: string;
    slug: string;
    description: string | null;
    content: string | null;
    status: ArticleStatus;

    static associate(models: any) {
      
    }
  }
  Article.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      slug: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: [ArticleStatus.ARCHIVED, ArticleStatus.DRAFT, ArticleStatus.PUBLISHED],
      },
    },
    {
      sequelize,
      underscored: true,
      modelName: 'article',
    },
  );
  return Article;
};
