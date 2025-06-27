import { Router } from 'express';
import { CampaignRoute } from './CampaignRoute';
import { messageRoute } from './messageRoute';
import { scrapRoute } from './ScrapRoute';

export const mainRoute = Router();

mainRoute.use('/',CampaignRoute);
mainRoute.use('/',messageRoute);
mainRoute.use('/scrape', scrapRoute);
