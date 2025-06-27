import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type{ Campaign } from '../types';
import InputField from '@components/InputField';
import Button from '@components/Button';
import ConfirmDialog from '@components/ConfirmDialog';
import CampaignCard from '@components/CampaignCard';
import useCampaigns from '@hooks/useCampaigns';
import { toast } from 'react-toastify';

const Campaigns: React.FC = () => {
    const {
        campaigns,
        loading,
        error,
        addCampaign,
        editCampaign,
        deleteCampaign,
        toggleStatus,
    } = useCampaigns();

    const [showForm, setShowForm] = useState<boolean>(false);
    const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
    const [formState, setFormState] = useState<Omit<Campaign, '_id' | 'status'>>({
        name: '',
        description: '',
        leads: [],
        accountIDs: [],
    });
    const [currentTextLead,setCurrentTextLead] = useState('');
    const [currentTextAccountID,setCurrentTextAccountID] = useState('');
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [campaignToDeleteId, setCampaignToDeleteId] = useState<string | null>(null);

    const handleLeadChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        setCurrentTextLead(value);
    };

    const handleLeadKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
                e.preventDefault();
                const trimmed = currentTextLead.trim();
                if (trimmed) {
                        setFormState((prev) => ({
                        ...prev,
                        leads: prev.leads.includes(trimmed)
                            ? prev.leads
                            : [...prev.leads, trimmed],
                        }));
                        setCurrentTextLead('');
                }
        } else if (e.key === 'Backspace' && currentTextLead.trim() === '') {
                setFormState((prev) => {
                        if (prev.leads.length === 0) return prev;
                        const leadsCopy = [...prev.leads];
                        const last = leadsCopy.pop() || '';
                        setCurrentTextLead(last);
                        return {
                                ...prev,
                                leads: leadsCopy,
                        };
                });
        }
    };

    const handleAccountsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        setCurrentTextAccountID(value);
    };

    const handleAccountsKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
                e.preventDefault();
                const trimmed = currentTextAccountID.trim();
                if (trimmed) {
                        setFormState((prev) => ({
                        ...prev,
                        accountIDs: prev.accountIDs.includes(trimmed)
                            ? prev.accountIDs
                            : [...prev.accountIDs, trimmed],
                        }));
                        setCurrentTextAccountID('');
                }
        } else if (e.key === 'Backspace' && currentTextAccountID.trim() === '') {
                setFormState((prev) => {
                        if (prev.accountIDs.length === 0) return prev;
                        const accountsCopy = [...prev.accountIDs];
                        const last = accountsCopy.pop() || '';
                        setCurrentTextAccountID(last);
                        return {
                                ...prev,
                                accountIDs: accountsCopy,
                        };
                });
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [id]: id === 'leads' || id === 'accountIDs' ? value.split(',').map(s => s.trim()).filter(Boolean) : value,
        }));
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingCampaign) {
                await editCampaign(editingCampaign._id, formState);
                setEditingCampaign(null);
            } else {
                await addCampaign(formState);
            }
            setShowForm(false);
            setFormState({ name: '', description: '', leads: [], accountIDs: [] });
        } catch (err:any) {
                toast.error(err?.message || 'Failed to submit campaign. Please try again.');
            console.error("Form submission failed:", err);
        }
    };

    const handleEditClick = (campaign: Campaign) => {
        setEditingCampaign(campaign);
        setFormState({
            name: campaign.name,
            description: campaign.description,
            leads: campaign.leads,
            accountIDs: campaign.accountIDs,
        });
        setShowForm(true);
    };

    const handleDeleteClick = (id: string) => {
        setCampaignToDeleteId(id);
        setIsConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (campaignToDeleteId) {
            try {
                await deleteCampaign(campaignToDeleteId);
            } catch (err:any) {
                toast.error(err?.message || 'Failed to delete campaign. Please try again.');
                console.error("Deletion failed:", err);
            } finally {
                setIsConfirmOpen(false);
                setCampaignToDeleteId(null);
            }
        }
    };

    const handleToggleStatus = async (campaign: Campaign) => {
        try {
            await toggleStatus(campaign);
        } catch (err:any) {
            toast.error(err?.message || 'Failed to toggle campaign status.');
            console.error('Error toggling campaign status:', err);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Campaign Management</h1>

            <Button onClick={() => { setShowForm(true); setEditingCampaign(null); setFormState({ name: '', description: '', leads: [], accountIDs: [] }); }} className="mb-6">
                Create New Campaign
            </Button>

            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white p-6 rounded-lg shadow-md mb-6"
                    >
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                            {editingCampaign ? 'Edit Campaign' : 'Create Campaign'}
                        </h2>
                        <form onSubmit={handleFormSubmit}>
                            <InputField
                                label="Campaign Name"
                                id="name"
                                value={formState.name}
                                onChange={handleFormChange}
                                required
                            />
                            <InputField
                                label="Description"
                                id="description"
                                value={formState.description}
                                onChange={handleFormChange}
                                multiline
                            />
                            <InputField
                                label="Leads (ENTER - separated LinkedIn URLs)"
                                id="leads"
                                onKeyDown={handleLeadKeyDown}
                                value={currentTextLead}
                                onChange={handleLeadChange}
                                multiline
                            />
                            <div>
                                {
                                        formState.leads.length > 0 && formState.leads.map((lead:any, index:number) => (
                                            <span key={index} className="inline-block bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded m-1">
                                                {lead}
                                                <button
                                                    type="button"
                                                    className="ml-1 text-blue-500 hover:text-blue-700"
                                                    onClick={() => {
                                                        setFormState((prev) => ({
                                                            ...prev,
                                                            leads: prev.leads.filter((_:any, i:any) => i !== index),
                                                        }));
                                                    }}
                                                >
                                                    &times;
                                                </button>
                                            </span>
                                        ))
                                }
                            </div>
                            <InputField
                                label="Account IDs (ENTER - separated)"
                                id="accountIDs"
                                onKeyDown={handleAccountsKeyDown}
                                value={currentTextAccountID}
                                onChange={handleAccountsChange}
                                multiline
                            />
                            <div>
                                {
                                        formState.accountIDs.length > 0 && formState.accountIDs.map((account:any, index:number) => (
                                            <span key={index} className="inline-block bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded m-1">
                                                {account}
                                                <button
                                                    type="button"
                                                    className="ml-1 text-blue-500 hover:text-blue-700"
                                                    onClick={() => {
                                                        setFormState((prev) => ({
                                                            ...prev,
                                                            leads: prev.leads.filter((_:any, i:number) => i !== index),
                                                        }));
                                                    }}
                                                >
                                                    &times;
                                                </button>
                                            </span>
                                        ))
                                }
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <Button type="submit">{editingCampaign ? 'Update Campaign' : 'Create Campaign'}</Button>
                                <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {loading && <p className="text-center text-gray-600">Loading campaigns...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.length === 0 && !loading && !error && (
                    <p className="col-span-full text-center text-gray-500">No campaigns found. Create one!</p>
                )}
                {campaigns.map((campaign) => (
                    <CampaignCard
                        key={campaign._id}
                        campaign={campaign}
                        onEdit={handleEditClick}
                        onToggleStatus={handleToggleStatus}
                        onDelete={handleDeleteClick}
                    />
                ))}
            </div>

            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Confirm Deletion"
                message="Are you sure you want to soft delete this campaign? It will not be visible but remain in the database."
            />
        </div>
    );
};

export default Campaigns;
