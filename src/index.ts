import { Page, ElementHandle, BrowserContext } from 'playwright/index';
import Config from './util/Config';
import { takeScreenShot } from './util/Util';

const TST_URL = 'https://tst.philips-hue.com';

const getLinksForPage = async (page: Page): Promise<Set<string>> => {
  const urlSet = new Set<string>();
  const anchors: ElementHandle[] = await page.$$('a');
  for (const anchor of anchors) {
    const href = await anchor.getAttribute('href');
    if (href && href.startsWith(TST_URL)) {
      urlSet.add(href);
    }
  }
  return urlSet;
};

const takeScreenShotsForPage = async (
  context: BrowserContext,
  urlTST: string,
  name: string
) => {
  const page: Page = await context.newPage();
  await page.goto(urlTST);
  // await page.evaluate(() => {
  //   window.scrollTo(0, document.body.scrollHeight);
  //   return;
  // });

  const elementHandle = await page.$('footer');
  
  await elementHandle?.scrollIntoViewIfNeeded();

  await takeScreenShot(page, Config.screenshotsDirs.TST, name);

  const urlToChange = new URL(urlTST);
  urlToChange.host = urlToChange.host.replace('tst', 'acc');

  await page.goto(urlToChange.toString());
  await takeScreenShot(page, Config.screenshotsDirs.ACC, name);

  await page.close();
  return;
};

(async () => {
  Config.browsers.forEach(async (browserType) => {
    const browser = await browserType.launch();
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    const homeURL = 'https://tst.philips-hue.com/en-ph';

    await page.goto(homeURL);
    const list = await getLinksForPage(page);
    console.log(`Found ${list.size} links in page: ${page.url()}`);

    await takeScreenShotsForPage(context, homeURL, 'home');

    console.log('closing');

    await page.close();
    await browser.close();
  });
})();
