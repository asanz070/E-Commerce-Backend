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

// Routes
// Products
const productRouter = require('./routes/products/productsRouter');
app.use('/api/products', productRouter)

// Customers
const customerRouter = require('./routes/customers/customersRouter');
app.use('/api/customer', customerRouter)

// Carts
const cartRouter = require('./routes/shopping-carts/cartsRouter')
app.use('/api/carts')

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
    connectToMongoDB();
})