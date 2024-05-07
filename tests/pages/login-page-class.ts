import { fill, getLocatorByText, gotoURL } from 'vasu-playwright-utils';
import { standardUserCredentials } from '@testdata/sauce-demo-test-data';
import { expectElementToBeAttached, expectElementToBeVisible } from 'vasu-playwright-utils';

export class LoginPage {
  private readonly userName = `#phoneNumber`;
  private readonly password = `#password`;
  // private readonly password = () => getLocator(`#password`).or(getLocatorByPlaceholder('Password', { exact: true }));
  // private readonly loginButton = () => getLocatorByRole('button', { name: 'Login' });
  private readonly logoutLink = () => getLocatorByText('Jesús', { exact: true });

  public async navigateToLoginPage(): Promise<void> {
    await gotoURL('/');
  }

  public async loginWithValidCredentials(validCredentials = standardUserCredentials): Promise<void> {
    console.log('---Step----' + validCredentials.username);
    await fill(this.userName, validCredentials.username);
    await fill(this.password, validCredentials.password);
    // await clickAndNavigate(this.loginButton());
    await this.verifyUserIsLoggedin();
  }

  public async verifyUserIsLoggedin(): Promise<void> {
    await expectElementToBeAttached(this.logoutLink(), 'User should be Logged in successfully');
  }

  public async verifyLoginPageIsDisplayed(): Promise<void> {
    await expectElementToBeVisible(this.userName, 'Login page should be displayed');
  }
}
