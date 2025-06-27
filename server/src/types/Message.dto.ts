import Joi from 'joi';

export const messageSchema = Joi.object({
    name: Joi.string().required(),
    job_title: Joi.string().required(),
    company: Joi.string().required(),
    location: Joi.string().required(),
    summary: Joi.string().required(),
    ai_prompt: Joi.string().optional(),
});
