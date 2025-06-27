import type { ScrapedLead } from "../types";

export interface ScrapeResponse {
    scrapedProfiles: ScrapedLead[]; 
}

export async function linkedinScrape(
    linkedinSearchUrl: string
): Promise<ScrapeResponse> {
    const response = await fetch('/api/scrape/linkedin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: linkedinSearchUrl }),
    });

    if (!response.ok) {
        throw new Error('Failed to scrape leads');
    }

    return response.json();
}
