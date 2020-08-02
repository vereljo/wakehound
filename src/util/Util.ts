import fs from 'fs';
import { Page } from 'playwright/types/types';

const takeScreenShot = async (page: Page, directory: string, name: string) => {
  const path = `${getDirectory(directory)}/${name}.png`;
  console.log(path);
  await page.screenshot({ path });
};

const getDirectory = (directory: string) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
  return directory;
};

export {
  takeScreenShot,
  getDirectory,
};
