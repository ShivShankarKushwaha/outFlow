import mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: String,
		status: { type: String, enum: ['active', 'inactive', 'deleted'], default: 'active' },
		leads: [String],
		accountIDs: [String]
	},
	{ timestamps: true }
);

export const Campaign = mongoose.model('Campaign', CampaignSchema);
