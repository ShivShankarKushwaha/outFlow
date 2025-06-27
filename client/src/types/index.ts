export interface Campaign {
    _id: string;
    name: string;
    description: string;
    status: 'active' | 'inactive' | 'deleted';
    leads: string[];
    accountIDs: string[];
}

export interface LinkedInProfileData {
    name: string;
    job_title: string;
    company: string;
    location: string;
    summary: string;
    ai_prompt?: string;
}

export interface MessageResponse {
    message: string;
}

export interface ScrapedLead {
    image: string;
    fullName: string;
    headline: string;
    summary: string;
    subText: string;
    location: string;
    linkedinUrl: string;
}
