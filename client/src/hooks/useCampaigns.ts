import { useState, useEffect, useCallback } from 'react';
import type { Campaign } from '../types';
import { fetchCampaigns, createCampaign, updateCampaign, deleteCampaign as apiDeleteCampaign } from '@api/campaigns';

const useCampaigns = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadCampaigns = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchCampaigns();
            setCampaigns(data);
        } catch (err) {
            setError('Failed to load campaigns.');
            console.error('Error loading campaigns:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCampaigns();
    }, [loadCampaigns]);

    const addCampaign = useCallback(async (newCampaignData: Omit<Campaign, '_id' | 'status'>) => {
        setLoading(true);
        setError(null);
        try {
            const createdCampaign = await createCampaign(newCampaignData);
            setCampaigns((prev) => [...prev, createdCampaign]);
            return createdCampaign;
        } catch (err) {
            setError('Failed to create campaign.');
            console.error('Error creating campaign:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const editCampaign = useCallback(async (id: string, updatedData: Partial<Campaign>) => {
        setLoading(true);
        setError(null);
        try {
            const updatedCampaign = await updateCampaign(id, updatedData);
            setCampaigns((prev) =>
                prev.map((campaign) => (campaign._id === id ? updatedCampaign : campaign))
            );
            return updatedCampaign;
        } catch (err) {
            setError('Failed to update campaign.');
            console.error('Error updating campaign:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteCampaign = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await apiDeleteCampaign(id);
            setCampaigns((prev) => prev.filter((campaign) => campaign._id !== id));
        } catch (err) {
            setError('Failed to delete campaign.');
            console.error('Error deleting campaign:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const toggleStatus = useCallback(async (campaign: Campaign) => {
        setLoading(true);
        setError(null);
        try {
            const newStatus = campaign.status === 'active' ? 'inactive' : 'active';
            const updatedCampaign = await updateCampaign(campaign._id, { status: newStatus });
            setCampaigns((prev) =>
                prev.map((c) => (c._id === campaign._id ? updatedCampaign : c))
            );
        } catch (err) {
            setError('Failed to toggle campaign status.');
            console.error('Error toggling campaign status:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        campaigns,
        loading,
        error,
        loadCampaigns,
        addCampaign,
        editCampaign,
        deleteCampaign,
        toggleStatus,
    };
};

export default useCampaigns;
