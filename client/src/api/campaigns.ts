import type { Campaign } from '../types';

const getErrorMessage = async (response: Response) => {
    try {
        const data = await response.json();
        return data?.error || data?.message || response.statusText;
    } catch {
        return response.statusText || 'An error occurred';
    }
};

export const fetchCampaigns = async (): Promise<Campaign[]> => {
    try {
        const response = await fetch(`/api/campaigns`);
        if (!response.ok) {
            throw new Error(await getErrorMessage(response));
        }
        return await response.json();
    } catch (err: any) {
        throw new Error(err.message || 'Failed to fetch campaigns');
    }
};

export const fetchCampaignById = async (id: string): Promise<Campaign> => {
    try {
        const response = await fetch(`/api/campaigns/${id}`);
        if (!response.ok) {
            throw new Error(await getErrorMessage(response));
        }
        return await response.json();
    } catch (err: any) {
        throw new Error(err.message || `Failed to fetch campaign with ID: ${id}`);
    }
};

export const createCampaign = async (campaign: Omit<Campaign, '_id' | 'status'>): Promise<Campaign> => {
    try {
        const response = await fetch(`/api/campaigns`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...campaign, status: 'active' }),
        });
        if (!response.ok) {
            throw new Error(await getErrorMessage(response));
        }
        return await response.json();
    } catch (err: any) {
        throw new Error(err.message || 'Failed to create campaign');
    }
};

export const updateCampaign = async (id: string, campaign: Partial<Campaign>): Promise<Campaign> => {
    try {
        const response = await fetch(`/api/campaigns/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(campaign),
        });
        if (!response.ok) {
            throw new Error(await getErrorMessage(response));
        }
        return await response.json();
    } catch (err: any) {
        throw new Error(err.message || `Failed to update campaign with ID: ${id}`);
    }
};

export const deleteCampaign = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`/api/campaigns/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(await getErrorMessage(response));
        }
    } catch (err: any) {
        throw new Error(err.message || `Failed to delete campaign with ID: ${id}`);
    }
};
