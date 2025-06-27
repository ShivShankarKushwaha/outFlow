import puppeteer, { Browser, Page } from 'puppeteer';
import path from 'path';
import env from '../env';

let browserInstance: Browser | null = null;
let pageInstance: Page | null = null;
let loginPromise: Promise<boolean> | null = null;
let isBrowserHeadless: boolean = true;

const USER_DATA_DIR = path.join(__dirname, '../../puppeteer_user_data');

export async function initializeBrowser(headless: boolean = true): Promise<Browser> {
    isBrowserHeadless = headless;

    if (browserInstance && !browserInstance.isConnected()) {
        browserInstance = null;
        loginPromise = null;
    }

    if (!browserInstance) {
        browserInstance = await puppeteer.launch({
            headless: isBrowserHeadless,
            userDataDir: USER_DATA_DIR,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-blink-features=AutomationControlled',
                '--disable-web-security',
                '--disable-features=IsolateOrigins,site-per-process',
                '--disable-dev-shm-usage'
            ],
            slowMo: 50
        });

        browserInstance.on('disconnected', () => {
            browserInstance = null;
            pageInstance = null;
            loginPromise = null;
        });
    }
    return browserInstance;
}

export async function getBrowser(): Promise<Browser> {
    if (!browserInstance || !browserInstance.isConnected()) {
        await initializeBrowser(true);
    }
    return browserInstance!;
}

export async function getPage(): Promise<Page> {
    if (!pageInstance) {
        const browser = await getBrowser();
        pageInstance = await browser.newPage();
        await pageInstance.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        );
        await pageInstance.setViewport({ width: 1000, height: 500, deviceScaleFactor: 1 });
    }
    return pageInstance;
}

export async function ensureLoggedIn(): Promise<boolean> {
    if (loginPromise) {
        return await loginPromise;
    }

    loginPromise = (async () => {
        const page = await getPage();

        try {
            await page.goto('https://www.linkedin.com/feed/', { waitUntil: 'domcontentloaded', timeout: 30000 });

            const loggedInElement = await page.$('.global-nav__me-photo');
            const currentUrl = page.url();

            if (loggedInElement || currentUrl.includes('linkedin.com/feed') || currentUrl.includes('linkedin.com/in/')) {
                return true;
            }

            await page.goto('https://www.linkedin.com/login', { waitUntil: 'networkidle2', timeout: 60000 });

            if (isBrowserHeadless) {
                closeBrowser();
                await initializeBrowser(false);
                await getPage();
                await page.goto('https://www.linkedin.com/login', { waitUntil: 'networkidle2', timeout: 60000 });
            }

            await page.waitForSelector('#username', { visible: true, timeout: 15000 });
            await page.type('#username', env.LINKEDIN_USERNAME);

            await page.waitForSelector('#password', { visible: true, timeout: 15000 });
            await page.type('#password', env.LINKEDIN_PASSWORD);

            await page.click('button[type="submit"]');

            await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 });

            await new Promise(res => setTimeout(res, 10000));

            const finalLoggedInCheck = await page.$('.global-nav__me-photo');
            if (finalLoggedInCheck) {
                return true;
            } else {
                await page.screenshot({ path: 'login_failure_after_attempt.png' });
                return false;
            }
        } catch (error) {
            if (page) await page.screenshot({ path: 'login_error_unexpected.png' });
            return false;
        }
    })();

    return await loginPromise;
}

export function closeBrowser(): void {
    if (browserInstance) {
        browserInstance.close();
        browserInstance = null;
        pageInstance = null;
        loginPromise = null;
    }
}
