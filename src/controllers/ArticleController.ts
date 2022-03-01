import { Service } from 'typedi';
import { Controller, Delete, Get, Post, Put } from '../common/decorators';
import { ArticleService } from '../services/ArticleService';
import { Container } from 'typedi';
import { validateData } from '../utils/validation-helper';
import Joi from 'joi';

const articleService = Container.get(ArticleService);

const articleValidationSchema = Joi.object({
  title: Joi.string().min(5).max(64),
  slug: Joi.string().min(1),
  description: Joi.string().min(1).max(256),
  content: Joi.string().min(1),
  status: Joi.string(),
  categoryId: Joi.number(),
  authorId: Joi.number(),
});

@Service()
@Controller({ routePrefix: '/articles' })
export class ArticleController {
  @Get('/')
  async listArticles(request, response) {
    return await articleService.getAllArticles();
  }

  @Post('/')
  async createArticle({ request, response }) {
    validateData(request.body, articleValidationSchema);
    return await articleService.createNewArticle(request);
  }

  @Get('/:id')
  async getArticle({ request, response }) {
    const articleId = request.params.id;
    return await articleService.getArticle(articleId);
  }

  @Delete('/:id')
  async archiveArticle({ request, response }) {
    const articleId = request.params.id;
    await articleService.deleteArticle(articleId);
    return response.status(201).send('Successfully deleted');
  }

  @Put('/:id')
  async updateArticle({ request, response }) {
    const articleId = request.params.id;
    validateData(request.body, articleValidationSchema);
    await articleService.updateArticle(request, articleId);
    return response.status(201).send('Successfully updated');
  }
}
