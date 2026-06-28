import { expect, test } from '@playwright/test';
import { CartPage } from '../../src/pages/CartPage';
import { LoginPage } from '../../src/pages/LoginPage';
import { ProductsPage } from '../../src/pages/ProductsPage';
import { productCatalog, standardUser } from '../fixtures/runtimeData';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto();
    await loginPage.login(standardUser.username, standardUser.password);
    await productsPage.expectLoaded();
  });

  test('added product appears in the cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.addProductToCart(productCatalog.backpack);
    await productsPage.expectCartBadgeCount(1);
    await productsPage.openCart();

    await cartPage.expectLoaded();
    await cartPage.expectProductInCart(productCatalog.backpack);
  });

  test('product can be removed from the inventory page', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.addProductToCart(productCatalog.backpack);
    await productsPage.removeProductFromCart(productCatalog.backpack);

    await productsPage.expectCartBadgeHidden();
  });

  test('product can be removed from the cart page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.addProductToCart(productCatalog.backpack);
    await productsPage.openCart();
    await cartPage.removeProduct(productCatalog.backpack);

    await expect(cartPage.cartItems).toHaveCount(0);
    await cartPage.expectProductNotInCart(productCatalog.backpack);
  });

  test('cart badge updates when multiple products are added', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.addProductToCart(productCatalog.backpack);
    await productsPage.addProductToCart(productCatalog.bikeLight);

    await productsPage.expectCartBadgeCount(2);
  });
});
