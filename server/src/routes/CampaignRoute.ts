import express from 'express';
import {CampaignController} from '../controllers';

export const CampaignRoute = express.Router();

CampaignRoute.get('/campaigns', CampaignController.getCampaigns);

CampaignRoute.get('/campaigns/:id', CampaignController.getCampaignById);

CampaignRoute.post('/campaigns', CampaignController.createCampaign);

CampaignRoute.put('/campaigns/:id', CampaignController.updateCampaign);

CampaignRoute.delete('/campaigns/:id', CampaignController.softDeleteCampaign);
