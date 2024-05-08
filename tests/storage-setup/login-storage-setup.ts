import { test as setup } from 'tests/fixtures/testFixtures';
import { validUsers } from '@testdata/oka-test-data';

setup.describe.configure({ mode: 'parallel' });

validUsers.forEach(user => {
  setup(`Save Login Storage`, async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.loginWithValidCredentials(user);
  });
});
