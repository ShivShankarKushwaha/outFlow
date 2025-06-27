import { Router } from 'express';
import { ScrapController } from '../controllers';

export const scrapRoute = Router();

scrapRoute.post('/linkedin', ScrapController.LinkedInScrapper);
