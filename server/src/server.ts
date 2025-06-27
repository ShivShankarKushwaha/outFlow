import express from 'express';
import { App } from './services';
import { dbConnect } from './config';
import env from './env';
import { closeBrowser, ensureLoggedIn, initializeBrowser } from './helpers/puppeteerManager';

async function startServer() {
	const app = express();
	App(app);
	await dbConnect();
	app.listen(env.PORT, async () => {
		console.log(`Server running on port ${env.PORT}`);
		try {
			await initializeBrowser();
			const loggedIn = await ensureLoggedIn();
			if (loggedIn) {
				console.log('LinkedIn login session established/verified successfully.');
			} else {
				console.error('Failed to establish LinkedIn login session. Scraping requests might fail.');
			}
		} catch (error) {
			console.log('Error during browser initialization or login:', error);
		}
	});
}

startServer();

process.on('SIGINT', async () => {
	console.log('SIGINT signal received. Closing browser...');
	await closeBrowser();
	return process.exit(0);
});
