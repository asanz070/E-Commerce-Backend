// ECHO is on.
const express = require('express');
const logger = require('morgan');
const app = express();

const connectToMongoDB = require('./database/connectToMongoDB')

const PORT = 3000;

const dotenv = require('dotenv');
dotenv.config();

// MiddleWare
app.use(express.json())
app.use(logger('dev'))

// Products - route
const productRouter = require('./routes/products/productsRouter');
app.use('/api/products', productRouter)

// Customers -route
const customerRouter = require('./routes/customers/customersRouter');
app.use('/api/customer', customerRouter)

// Carts - route
const cartRouter = require('./routes/shopping-carts/cartsRouter')
app.use('/api/carts', cartRouter)

// Order -route
const orderRouter = require('./routes/orders/ordersRouter');
app.use('/api/orders', orderRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
    connectToMongoDB();
})