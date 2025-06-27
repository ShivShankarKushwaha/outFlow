import React from 'react';
import { motion } from 'framer-motion';
import type { Campaign } from '../types';
import Button from '@components/Button';

interface CampaignCardProps {
  campaign: Campaign;
  onEdit: (campaign: Campaign) => void;
  onToggleStatus: (campaign: Campaign) => void;
  onDelete: (id: string) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  onEdit,
  onToggleStatus,
  onDelete,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      layout
      className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between"
    >
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{campaign.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{campaign.description}</p>
        <div className="flex items-center mb-3 flex-wrap gap-2">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {campaign.status.toUpperCase()}
          </span>
          <span className="text-sm text-gray-500">Leads: {campaign.leads.length}</span>
          <span className="text-sm text-gray-500">Accounts: {campaign.accountIDs.length}</span>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={() => onEdit(campaign)} variant="secondary">
          Edit
        </Button>
        <Button onClick={() => onToggleStatus(campaign)} variant="secondary">
          {campaign.status === 'active' ? 'Deactivate' : 'Activate'}
        </Button>
        <Button onClick={() => onDelete(campaign._id)} variant="danger">
          Delete
        </Button>
      </div>
    </motion.div>
  );
};

export default CampaignCard;
