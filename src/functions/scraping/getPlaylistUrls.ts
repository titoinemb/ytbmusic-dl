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
    baseURL: 'https://www.youtube.com',
  });

  await context.addCookies(require("../../../config/cookies.json"));
  await context.setDefaultTimeout(180000)

  const page = await context.newPage();

  await page.goto(`https://youtube.com/playlist?list=${id}`);

  await page.waitForLoadState('networkidle');

  const selector = 'a#video-title.yt-simple-endpoint.style-scope.ytd-playlist-video-renderer';

  await page.waitForSelector(selector);

  const videoUrls = await page.evaluate((sel) => {
    const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>(sel));

    return anchors
      .map((a) => a.href)
      .filter((href) => href.includes('watch') || href.includes('youtu.be') || href.includes('?v='))
      .map((href) => {
        const url = new URL(href, 'https://www.youtube.com');
        const videoId = url.searchParams.get('v') ?? url.pathname.split('/').pop();
        return videoId;
      });
  }, selector);

  await browser.close();

  return videoUrls;
};