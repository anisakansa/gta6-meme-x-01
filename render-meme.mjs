// Build-time renderer: screenshot meme.html at 1024x1024 into entry.png.
// Run from ~/workspace/tools/makefun so playwright-core resolves.
// Not part of the graded program: main.ts only validates and copies entry.png.
import { chromium } from 'playwright-core';

const repo = '/home/hatch/workspace/tools/makefun/gta6-meme-x-01';
const chrome = '/home/hatch/.cache/ms-playwright/chromium-1187/chrome-linux/chrome';

const browser = await chromium.launch({
  executablePath: chrome,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });
await page.goto('file://' + repo + '/meme.html', { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(400);
await page.screenshot({ path: repo + '/entry.png' });
await browser.close();
console.log('entry.png rendered');
