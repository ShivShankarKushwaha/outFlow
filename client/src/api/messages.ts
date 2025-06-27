import type { LinkedInProfileData, MessageResponse } from '../types';

export const generatePersonalizedMessage = async (
    profileData: LinkedInProfileData
): Promise<MessageResponse> => {
    const response = await fetch(`/api/personalized-message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData?.error || errorData?.message || 'Failed to generate message';
        throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
};
