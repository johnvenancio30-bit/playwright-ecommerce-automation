import { expect, test } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import products from '../test-data/products.json';
import users from '../test-data/users.json';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await productsPage.expectLoaded();
  });

  test('added product appears in the cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.addProductToCart(products.backpack);
    await productsPage.expectCartBadgeCount(1);
    await productsPage.openCart();

    await cartPage.expectLoaded();
    await cartPage.expectProductInCart(products.backpack);
  });

  test('product can be removed from the inventory page', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.addProductToCart(products.backpack);
    await productsPage.removeProductFromCart(products.backpack);

    await productsPage.expectCartBadgeHidden();
  });

  test('product can be removed from the cart page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.addProductToCart(products.backpack);
    await productsPage.openCart();
    await cartPage.removeProduct(products.backpack);

    await expect(cartPage.cartItems).toHaveCount(0);
    await cartPage.expectProductNotInCart(products.backpack);
  });

  test('cart badge updates when multiple products are added', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.addProductToCart(products.backpack);
    await productsPage.addProductToCart(products.bikeLight);

    await productsPage.expectCartBadgeCount(2);
  });
});
