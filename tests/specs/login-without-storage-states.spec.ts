import { test } from '@fixturesetup';
import { standardUserCredentials } from '@testdata/customers/customer-test-data';
import { standardLead } from '@testdata/leads/lead-test-data';
import leadsService from '../../test-setup/api/leads/LeadsService';

test.describe.configure({ mode: 'parallel' });

test.describe('Saucedemo tests for successful, unsuccessful logins and add products to cart @smoke', () => {
  test('Saucedemo tests - Successful login will display Products Page 1', async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
    await leadsService.createLead(standardLead);
    await loginPage.loginWithValidCredentials(standardUserCredentials);
  });

  test('Saucedemo tests - Successful login will display Products Page 2', async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
    await leadsService.createLead(standardLead);
    await loginPage.loginWithValidCredentials(standardUserCredentials);
  });

  test('Saucedemo tests - Successful login will display Products Page 3', async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
    await leadsService.createLead(standardLead);
    await loginPage.loginWithValidCredentials(standardUserCredentials);
  });
});
