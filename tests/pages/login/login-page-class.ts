import {
  clickAndNavigate,
  expectElementToBeVisible,
  fill,
  getLocatorByRole,
  getLocatorByText,
  gotoURL,
} from 'vasu-playwright-utils';
import { standardUserCredentials } from '@testdata/customers/customer-test-data';

export class LoginPage {
  private readonly userName = `#phoneNumber`;

  private readonly password = `#password`;

  private readonly loginButton = () => getLocatorByRole('button', { name: 'Ingresar' });

  public async navigateToLoginPage(): Promise<void> {
    await gotoURL('/');
  }

  public async loginWithValidCredentials(validCredentials = standardUserCredentials): Promise<void> {
    await fill(this.userName, validCredentials.mobile);
    await fill(this.password, 'Done@123');
    await clickAndNavigate(this.loginButton());

    await expectElementToBeVisible(getLocatorByText(`¡Bienvenido ${validCredentials}!`, { exact: true }));
  }
}
