# Automation System Note

## What This System Does

This system automatically checks if an online store is working properly.

It acts like a real customer by doing common actions such as:

- Opening the website
- Logging in
- Viewing products
- Adding an item to the cart
- Going through checkout
- Confirming that the order was successful

If something is broken, the system creates a report showing what failed.

## Why It Helps A Business

This system helps a business find website problems before real customers experience them.

It can help prevent issues such as:

- Customers cannot log in
- Products do not appear
- The cart does not work
- Checkout is broken
- A website update causes errors

By finding these problems early, the business can fix them before losing sales or frustrating customers.

## How To Use It

Open the project folder and run:

```powershell
npm test
```

This runs the full automatic website check.

To run only the checkout check:

```powershell
npm run test:checkout
```

To view the test report:

```powershell
npm run test:report
```

## Simple Workflow

```text
Website update is made
Run automation test
System checks important customer actions
Report shows pass or fail
Fix problems before customers see them
```

## Simple Summary

This system helps a business test its online store automatically so it can release updates with less risk.
