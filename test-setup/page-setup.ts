import { test as baseTest, expect } from '@playwright/test';
import { Environment } from '../playwright/setup/environment';
import { setPage } from '../playwright/utils/page-utils';

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
