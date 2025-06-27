import { Request, Response } from 'express';
import { getPage, ensureLoggedIn } from '../helpers/puppeteerManager';

const LinkedInScrapper = async (req: Request, res: Response) => {
	const { url: searchUrl } = req.body;
	if (!searchUrl) {
		return res.status(400).json({ error: 'Missing LinkedIn search URL in request body' });
	}

	const isLoggedIn = await ensureLoggedIn();
	if (!isLoggedIn) {
		console.error('[Scraper] Failed to log into LinkedIn. Cannot proceed with scraping.');
		return res.status(503).json({
			error: 'Failed to log into LinkedIn.',
			message: 'Puppeteer could not establish a logged-in session. Manual intervention or re-login might be required.'
		});
	}

	let page;
	try {
		page = await getPage();

		await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 60000 });
		const people = await page.evaluate(() => {
			const results: any[] = [];
			const nodes = document.querySelectorAll('[data-view-name="search-entity-result-universal-template"]');
			nodes.forEach((node) => {
				const imgElement = node.querySelector('img[src]');
				const image = imgElement ? imgElement.getAttribute('src') : '';
				const fullName =
					node
						.querySelector(
							`[data-view-name="search-entity-result-universal-template"] > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)> div:nth-child(1)> span:nth-child(1)> span:nth-child(1) a`
						)
						?.textContent?.trim() || '';
				const headline =
					node
						.querySelector(
							`[data-view-name="search-entity-result-universal-template"] > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)> div:nth-child(2)`
						)
						?.textContent?.trim() || '';
				const location =
					node
						.querySelector(
							`[data-view-name="search-entity-result-universal-template"] > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)> div:nth-child(3)`
						)
						?.textContent?.trim() || '';
				const profileLinkElement =
					node
						.querySelector(
							`[data-view-name="search-entity-result-universal-template"] > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)> div:nth-child(1)> span:nth-child(1)> span:nth-child(1) a`
						)
						?.getAttribute('href') || '';
				const summary =
					node
						.querySelector(`[data-view-name="search-entity-result-universal-template"] > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)> p`)
						?.textContent?.trim() || '';

				let rawSubText = node.querySelector(
					`[data-view-name="search-entity-result-universal-template"] > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3)`
				)?.textContent;
				const subText = rawSubText?.replace(/\s+/g, ' ')?.trim();

				results.push({
					image,
					fullName,
					headline,
					summary,
					subText,
					location,
					linkedinUrl: profileLinkElement
				});
			});
			return results;
		});
		res.json({ scrapedProfiles: people });
	} catch (error) {
		console.error('[Scraper] Failed to scrape LinkedIn data:', error);
		res.status(500).json({
			error: 'Failed to scrape LinkedIn data',
			message: (error as Error).message || 'An unknown error occurred during scraping.'
		});
	}
};

export const ScrapController = {
	LinkedInScrapper
};
