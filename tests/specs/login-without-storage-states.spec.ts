// @fixturesetup is the alias path set up for importing fixtures from testFixtures file.
// Don't have to import individual page objects because they are initialized in fixtures and passed as test parameters.
import { test } from '@fixturesetup';
import { standardUserCredentials } from '@testdata/sauce-demo-test-data';

test.describe.configure({ mode: 'parallel' });
/**
 * To run tests with different user storageStates in the same spec file then isolate them in to test.describe blocks
 * See https://playwright.dev/docs/next/auth#multiple-signed-in-roles
 */
test.describe('Saucedemo tests for successful, unsuccessful logins and add products to cart @smoke', () => {
  test('Saucedemo tests - Successful login will display Products Page 1', async ({ loginPage, productsPage }) => {
    await loginPage.loginWithValidCredentials(standardUserCredentials);
    // verifying products page is displayed on successful login
    await productsPage.verifyProductsPageIsDisplayed();
  });
});
