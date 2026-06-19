import { test } from '@playwright/test';
import config from '../../../playwright.config';

test('Base Logging', async () => {
  console.log(config.use?.baseURL || 'No base URL defined');
  console.log(config.use?.apiURL || 'No API URL defined');
});