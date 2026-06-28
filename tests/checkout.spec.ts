import { test } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import checkoutData from '../test-data/checkout.json';
import products from '../test-data/products.json';
import users from '../test-data/users.json';

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await productsPage.expectLoaded();
  });

  test('customer can complete an order for one product', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await productsPage.addProductToCart(products.backpack);
    await productsPage.openCart();
    await cartPage.expectLoaded();
    await cartPage.checkout();

    await checkoutPage.expectInformationStepLoaded();
    await checkoutPage.fillCustomerInfo(checkoutData.validCustomer);
    await checkoutPage.continue();

    await checkoutPage.expectOverviewLoaded();
    await checkoutPage.expectProductInOverview(products.backpack);
    await checkoutPage.finishOrder();

    await checkoutPage.expectOrderComplete();
  });

  test('checkout requires first name', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await productsPage.addProductToCart(products.backpack);
    await productsPage.openCart();
    await cartPage.checkout();

    await checkoutPage.expectInformationStepLoaded();
    await checkoutPage.continue();

    await checkoutPage.expectErrorMessage('First Name is required');
  });

  test('checkout requires postal code after customer name is entered', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await productsPage.addProductToCart(products.backpack);
    await productsPage.openCart();
    await cartPage.checkout();

    await checkoutPage.expectInformationStepLoaded();
    await checkoutPage.firstNameInput.fill(checkoutData.validCustomer.firstName);
    await checkoutPage.lastNameInput.fill(checkoutData.validCustomer.lastName);
    await checkoutPage.continue();

    await checkoutPage.expectErrorMessage('Postal Code is required');
  });
});
