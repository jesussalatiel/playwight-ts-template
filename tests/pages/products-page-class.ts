import { click, expectElementToBeHidden, expectElementToBeVisible, getLocator } from '../../playwright';

export class ProductsPage {
  private readonly productsContainer = () => getLocator(`#inventory_container`).nth(0);

  private readonly addToCartButton = (num: number) =>
    `(//*[@class='inventory_item'])[${num}]//*[contains(@id,'add-to-cart')]`;

  public async verifyProductsPageIsDisplayed(): Promise<void> {
    await expectElementToBeVisible(this.productsContainer(), {
      timeout: 1000,
      message: 'Logged in user should see Products',
    });
  }

  public async verifyProductsPageIsNotDisplayed(): Promise<void> {
    await expectElementToBeHidden(this.productsContainer(), 'Products should not be displayed');
  }

  public async addToCartByProductNumber(productNo: number): Promise<void> {
    await click(this.addToCartButton(productNo));
  }
}
