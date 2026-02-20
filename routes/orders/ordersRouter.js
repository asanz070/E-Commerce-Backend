const express = require('express');
const router = express.Router();

const { placeOrder, getCustomerOrders, getOrderById, updateOrderStatus } = require('./ordersController')

// Create an order using customer id
router.post('/place/:customerId', async (request, response) => {
    try {
        const putOrder = await placeOrder(request.params.customerId)
        response.status(201).json({ message: 'success', payload: putOrder })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error.message })
    }
})

// Get Customer Orders
router.get('/:customerId', async (request, response) => {
    try {
        const customerData = {
            customerId: request.params.customerId,
            status: request.query.status,
            sortBy: request.query.sortBy,
            sortOrder: request.query.sortOrder
        }

        const getOrders = await getCustomerOrders(customerData);
        response.status(200).json({ message: 'success', payload: getOrders })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error })
    }
})

// Get order by id
router.get('/order/:orderId', async (request, response) => {
    try {
        const orderId = await getOrderById(request.params.orderId)
        response.status(200).json({ message: 'success', payload: orderId })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error })
    }
})

// Update the order status
router.put('/:orderId/update', async (request, response) => {
    try {
        const updateStatus = await updateOrderStatus(
            request.params.orderId,
            request.body.status
        )
        response.status(200).json({ message: 'success', payload: updateStatus })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error })
    }
})

module.exports = router