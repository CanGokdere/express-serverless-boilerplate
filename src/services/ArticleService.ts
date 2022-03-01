import { Service } from 'typedi';
import models from '../models';
import { Request } from 'express';
import { HttpException } from '../common/exceptions/http.exception';
import { HttpStatus } from '../common/enums/httpStatus.enum';

@Service()
export class ArticleService {
  async getAllArticles() {
    const articles = await models.article.findAll({
      include: [
        {
          model: models.category,
        },
        {
          model: models.author,
        },
      ],
    });
    return articles;
  }

  async createNewArticle(request: Request) {
    const newArticle = await models.article
      .create(request.body, {
        include: [
          {
            model: models.category,
          },
          {
            model: models.author,
          },
        ],
      })
      .catch((error) => {
        const errorMessage = error.errors[0].message;
        throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
      });
    return newArticle;
  }

  async getArticle(articleId: number) {
    const foundArticle = await models.article.findOne({
      where: { id: articleId },
      include: [
        {
          model: models.category,
        },
        {
          model: models.author,
        },
      ],
    });
    if (!foundArticle) {
      throw new HttpException('Article with given id not found', HttpStatus.NOT_FOUND);
    }
    return foundArticle;
  }

  async deleteArticle(articleId: number) {
    const deletedArticle = await models.article.destroy({
      where: { id: articleId },
      include: [
        {
          model: models.category,
        },
        {
          model: models.author,
        },
      ],
    });
    if (!deletedArticle) {
      throw new HttpException('Article with given id not found', HttpStatus.BAD_REQUEST);
    }
    return deletedArticle;
  }

  async updateArticle(request: Request, articleId: number) {
    const updatedArticle = await models.article.update(request.body, {
      where: { id: articleId },
      include: [
        {
          model: models.category,
        },
        {
          model: models.author,
        },
      ],
    });
    if (!updatedArticle) {
      throw new HttpException('Article with given id not found', HttpStatus.NOT_FOUND);
    }
    return updatedArticle;
  }
}
