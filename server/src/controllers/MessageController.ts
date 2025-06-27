import { Request, Response } from 'express';
import { OpenAIHelper } from '../helpers';
import { messageSchema } from '../types';

const getMessage = async (req: Request, res: Response) => {
    const { error } = messageSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
	const {message} = await OpenAIHelper.generateMessage(req.body);
	res.json({ message });
};


export const MessageController = {
    getMessage
};
