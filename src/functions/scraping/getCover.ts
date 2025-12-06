import { chromium } from 'playwright';

export default async (id: string) => {
  if (!id || id.trim() === "") {
    console.log("no id")
    
    return process.exit(1);
  };

  const browser = await chromium.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--disable-extensions',
      '--disable-popup-blocking',
      '--window-size=1920,1080',
    ],
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    viewport: { width: 1920, height: 1080 },
    acceptDownloads: false,
    baseURL: 'https://music.youtube.com',
  });

  await context.addCookies(require("../../../config/cookies.json"));
  await context.setDefaultTimeout(180000);

  const page = await context.newPage();

  await page.goto(`https://music.youtube.com/watch?v=${id}`);

  await page.waitForLoadState('networkidle');

  await page.waitForSelector('yt-img-shadow[object-fit="COVER"] img');

  let coverUrl = await page.$eval('yt-img-shadow[object-fit="COVER"] img', (img) => {
    return (img as HTMLImageElement).src;
  });

  await browser.close();
  
  return coverUrl;
};