import { Request, Response } from 'express';
import { Campaign } from '../models';
import { campaignCreateSchema, campaignUpdateSchema } from '../types';

const getCampaigns = async (_: any, res: Response) => {
	const data = await Campaign.find({ status: { $ne: 'deleted' } });
	res.json(data);
};

const getCampaignById = async (req: Request, res: Response) => {
	const { id } = req.params;
	const campaign = await Campaign.findById(id);
	if (!campaign || campaign.status === 'deleted') {
		return res.status(404).json({ message: 'Campaign not found' });
	}
	res.json(campaign);
};

const createCampaign = async (req: Request, res: Response) => {
	const { error, value } = campaignCreateSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	const newCampaign = new Campaign(value);
	await newCampaign.save();
	res.status(201).json(newCampaign);
};

const updateCampaign = async (req: Request, res: Response) => {
	const { error, value } = campaignUpdateSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	const { id } = req.params;
	const campaign = await Campaign.findByIdAndUpdate(id, value, { new: true });
	if (!campaign || campaign.status === 'deleted') {
		return res.status(404).json({ message: 'Campaign not found' });
	}
	res.json(campaign);
};

const softDeleteCampaign = async (req: Request, res: Response) => {
	const { id } = req.params;
	const campaign = await Campaign.findByIdAndUpdate(id, { status: 'deleted' }, { new: true });
	if (!campaign) {
		return res.status(404).json({ message: 'Campaign not found' });
	}
	res.json({ message: 'Campaign soft deleted successfully' });
};

export const CampaignController = {
	getCampaigns,
	getCampaignById,
	createCampaign,
	updateCampaign,
	softDeleteCampaign
};
