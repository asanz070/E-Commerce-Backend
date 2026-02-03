# E-Commerce Backend API Project

## Project Overview

You will design and build the backend for **MegaMart**, a simplified e-commerce platform. This project will challenge your backend skills, requiring you to:

- Design MongoDB models for key e-commerce entities
- Build a RESTful API using Node.js, Express, and Mongoose
- Implement filtering and sorting on product listings
- Handle relationships across collections using Mongoose references
- Develop clean and modular code with proper error handling
- Place your projects on GitHub after getting them set up. Make incremental commits as you progress

This project will focus purely on backend functionality. **Authentication and security are not part of this project.**

---

## Models

Note which models are referencing other documents in the database.

### Products

- CRUD operations (GET, GET by ID, POST, PUT, DELETE)
- Fields:
  - `name` _(string)_
  - `description` _(string)_
  - `price` _(number)_
  - `category` _(string)_
  - `stock` _(number)_
  - `images` _(array of strings for image URLs)_ (optional)
- Products should support **filtering and sorting** through query parameters:
  - Filter by category, price range, and in-stock status
  - Sort by price or name (ascending or descending)

#### Example Query:

```
GET /products?category=tech&minPrice=20&maxPrice=100&inStock=true&sort=-price
```

---

### Customers

- CRUD operations
- Fields:
  - `name` _(string)_
  - `email` _(string)_
  - `address` _(string)_
  - `phone` _(string)_

---

### Shopping Carts

- One shopping cart per customer
- Fields:
  - `customer` _(reference to Customer)_
  - `items` _(array of objects with `productId` (reference to Product) (required) and `quantity` (number) (stretch goal))_
- Endpoints should allow:
  - Adding a product to the cart
  - Removing a product
  - Clearing the cart
  - Retrieving the cart (get all items in cart and include total price calculation)
  - Update quantity (stretch goal)

---

### Orders

- Orders are placed based on the shopping cart
- Suggested fields:
  - `customer` _(reference to Customer)_
  - `items` _(copied from the cart at order time)_
  - `total` _(calculated from cart)_
  - `status` _("pending", "shipped", "delivered", "cancelled")_
- Endpoints should allow:
  - Placing an order from a cart
  - Viewing a customer's orders
  - Filtering orders by status
  - Updating the status of an order

---

## Project Guidelines

- Structure your project using **Models**, **Routes**, and **Controllers**
- Use Mongoose references to relate orders and shopping carts to customers and their items.
- Make use of `.populate()` to return related data where appropriate.

---

## Bonus Challenges (Optional)

- Add **pagination** to product listings using `page` and `limit` query parameters.
- Automatically reduce product stock when an order is placed.
- Allow customers to leave reviews on products by adding a Review model
- Integrate JWT as well as bcrypt for customers (make sure to add a password field to the Customer model as well)

---
