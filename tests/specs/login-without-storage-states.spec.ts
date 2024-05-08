import { test } from '@fixturesetup';
import { standardUserCredentials } from '@testdata/customers/customer-test-data';
import { standardLead } from '@testdata/leads/lead-test-data';
import { leads } from '@micro-services';

test.describe.configure({ mode: 'parallel' });

test.describe('Saucedemo tests for successful, unsuccessful logins and add products to cart @HappyPath', () => {
  test('Saucedemo tests - Successful login will display Products Page 1', async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
    await leads.createLead(standardLead);
    await loginPage.loginWithValidCredentials(standardUserCredentials);
  });

  test('Saucedemo tests - Successful login will display Products Page 2', async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
    await leads.createLead(standardLead);
    await loginPage.loginWithValidCredentials(standardUserCredentials);
  });
});
