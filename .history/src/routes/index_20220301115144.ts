import { Router } from 'express';
import { mapRoutes } from './route-mapper';
import { ArticleController } from '../controllers/ArticleController';

const appRoutes = Router();

mapRoutes(appRoutes, [
  ArticleController,
]);

export default appRoutes;
