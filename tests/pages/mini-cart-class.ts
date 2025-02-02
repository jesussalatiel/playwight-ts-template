import { expectElementToHaveText, getLocator } from '../../playwright';

export class MiniCart {
  // We will use public modifier if we want to access the locator outside of this class
  private readonly miniCartCount = () => getLocator(`//*[@id='shopping_cart_container']//span`);

  async verifyMiniCartCount(expectedMiniCartCount: string): Promise<void> {
    await expectElementToHaveText(this.miniCartCount(), expectedMiniCartCount);
  }
}
