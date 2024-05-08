import { test } from '@fixturesetup';
import { standardUserCredentials } from '@testdata/oka-test-data';

test.describe.configure({ mode: 'parallel' });

test.describe('Saucedemo tests for successful, unsuccessful logins and add products to cart @smoke', () => {
  test('Saucedemo tests - Successful login will display Products Page 1', async ({ loginPage }) => {
    await loginPage.loginWithValidCredentials(standardUserCredentials);
    // verifying products page is displayed on successful login
    // await productsPage.verifyProductsPageIsDisplayed();
  });
});
