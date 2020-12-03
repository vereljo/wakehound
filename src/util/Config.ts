import { ChromiumBrowser } from 'playwright/types/types';
import { chromium } from 'playwright';

export default {
  browsers: [ chromium ],
  screenshotsDirs: {
    ACC: './screenshots/ACC',
    TST: './screenshots/TST',
  }
};