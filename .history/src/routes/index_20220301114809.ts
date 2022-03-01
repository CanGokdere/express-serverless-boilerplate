import { Router } from 'express';
import { mapRoutes } from './route-mapper';
import { ArticleController } from '../controllers/ArticleController';
import { ArticleImageController } from '../controllers/ArticleImageController';
import { ArticleMaterialController } from '../controllers/ArticleMaterialController';
import { ArticleVideoController } from '../controllers/ArticleVideoController';
import { AuthorController } from '../controllers/AuthorController';
import { CategoryController } from '../controllers/CategoryController';
import { ShopUrlController } from '../controllers/ShopUrlController';

const appRoutes = Router();

mapRoutes(appRoutes, [
  ArticleController,
  ArticleImageController,
  ArticleMaterialController,
  ArticleVideoController,
  AuthorController,
  CategoryController,
  ShopUrlController,
]);

export default appRoutes;
