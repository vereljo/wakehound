import playwright from 'playwright/index';
import { Page } from 'playwright/types/types';
import Config from './util/Config';
import { takeScreenShot } from './util/Util';

(async () => {

  for (const browserType of Config.browsers) {
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    await page.goto('https://tst.philips-hue.com/en-ph');

    const anchorsInpage = await page.$$('a');
    console.log(anchorsInpage);
    anchorsInpage.forEach(anchor => console.log(anchor));

    await takeScreenShot(page, Config.screenshotsDirs.ACC, 'homepage');

    await browser.close();
  }

})();