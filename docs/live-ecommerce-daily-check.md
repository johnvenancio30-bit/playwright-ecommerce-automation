# Live E-Commerce Daily Check

This project can be connected to a running e-commerce web app and used as a daily health check.

## Purpose

The goal is to check that the most important customer actions still work every day.

Example daily check:

```text
Open website
Log in with test account
View products
Add product to cart
Open cart
Open checkout page
Stop before real payment
Create report
```

## Safe Business Setup

Use only safe test data:

- Test customer account
- Test product or low-risk product
- Test payment mode, if checkout will be completed
- Staging environment, if available

Do not use:

- Real customer accounts
- Real customer personal data
- Real payment cards
- Real paid orders unless the business explicitly allows test orders

## GitHub Settings

In GitHub, open:

```text
Repository -> Settings -> Secrets and variables -> Actions
```

Add this repository variable:

```text
BASE_URL = https://your-ecommerce-webapp.com
```

Add these repository secrets:

```text
TEST_USERNAME = test-user@example.com
TEST_PASSWORD = test-password
```

## Daily Schedule

The workflow in `.github/workflows/playwright.yml` runs every day:

```yaml
schedule:
  - cron: "0 0 * * *"
```

This means once daily at 12:00 AM UTC.

## What Still Needs To Be Customized

The current tests are built for SauceDemo. To connect a real web app, update the selectors and actions in:

```text
src/pages/LoginPage.ts
src/pages/ProductsPage.ts
src/pages/CartPage.ts
src/pages/CheckoutPage.ts
```

Examples:

```text
Login button text
Email field placeholder
Password field placeholder
Product card selector
Cart button selector
Checkout button selector
Success message selector
```

## Recommended First Live Check

Start with a safe check that does not place an order:

```text
Homepage loads
Login works
Products load
Add to cart works
Cart opens
Checkout page opens
Stop before payment
```

Only complete checkout if the web app has a safe test payment mode.

## Result

Every 24 hours, GitHub Actions will:

```text
Open the web app
Run the automation checks
Show pass or fail
Upload the Playwright report
Upload screenshots, videos, and traces when failures happen
```
