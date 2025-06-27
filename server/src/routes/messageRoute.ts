import { Router } from 'express';
import { MessageController } from '../controllers';

export const messageRoute = Router();

messageRoute.post('/personalized-message', MessageController.getMessage);
