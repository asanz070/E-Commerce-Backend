const express = require('express');
const router = express.Router();

const { placeOrder, getCustomerOrders, getOrderById, updateOrderStatus } = require('./ordersController')

module.exports = router