/**
 * Page-setup.ts: This module is responsible for setting up the initial state of a page before each test. It includes a
 * hook that runs before each test, setting the page context. By centralizing these setup operations, it ensures a
 * consistent starting point for each test, improving test reliability. It also exports a base test object with a
 * beforeEach hook already set up. This can be used to define tests with the page context set up.
 */

import { test as baseTest, expect } from '@playwright/test';
import { setPage } from 'vasu-playwright-utils';
import { Environment } from '../playwright/utils/Environment';

/**
 * A hook that runs before each test, setting the page context. The base test object with a beforeEach hook is already
 * set up. This can be used to define tests with the page context set up.
 *
 * @param {Page} page - The page context provided by Playwright.
 */

export const test = baseTest.extend<{ testHook: void }>({
  testHook: [
    async ({ page }, use) => {
      const env = new Environment();
      await env.setup();
      setPage(page);
      await use();
      await env.tearDown();
    },
    { auto: true },
  ],
});

export { expect };
