import Joi from 'joi';

export enum CampaignStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    DELETED = 'deleted',
}

export interface CampaignDTO {
    name: string;
    description: string;
    status: CampaignStatus;
    leads: string[];
    accountIDs: string[];
}

export const campaignCreateSchema = Joi.object<CampaignDTO>({
    name: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string()
        .valid(CampaignStatus.ACTIVE, CampaignStatus.INACTIVE, CampaignStatus.DELETED)
        .default(CampaignStatus.ACTIVE),
    leads: Joi.array().items(Joi.string().uri().required()).required(),
    accountIDs: Joi.array().items(Joi.string().required()).required(),
});

export const campaignUpdateSchema = Joi.object<Partial<CampaignDTO>>({
    name: Joi.string(),
    description: Joi.string(),
    status: Joi.string().valid(
        CampaignStatus.ACTIVE,
        CampaignStatus.INACTIVE,
        CampaignStatus.DELETED
    ),
    leads: Joi.array().items(Joi.string().uri()),
    accountIDs: Joi.array().items(Joi.string()),
});
