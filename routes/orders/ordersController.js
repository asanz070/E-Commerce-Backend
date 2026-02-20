// Import Order model
const Order = require('../orders/ordersModel');

// Import getCartByCustomerId function from cartsController
const { getCartByCustomerId, clearCart } = require('../shopping-carts/cartsController');

// Create customer order
const placeOrder = async (customerId) => {
    try {
        // Get the cart
        const findCart = await getCartByCustomerId(customerId)

        // Validate if cart exists and has items
        if (!findCart || findCart.items.length === 0) {
            throw new Error('Cart is empty or not found');
        }

        // Create a new order based on the cart
        const newOrder = await Order.create({
            customer: customerId,
            items: findCart.items,
            total: findCart.total
        })

        await newOrder.populate('customer', 'name email')
        await newOrder.populate('items.productId', 'name category price')

        await clearCart(customerId)

        return newOrder
    } catch (error) {
        throw error
    }
}

// Get orders for one customer
const getCustomerOrders = async (customerData) => {
    try {
        const orderQuery = {};

        if (customerData.customerId) {
            orderQuery.customer = customerData.customerId
        }

        if (customerData.status) {
            orderQuery.status = customerData.status
        }

        const sortOrder = {};

        if (customerData.sortBy) {
            sortOrder[customerData.sortBy] = customerData.sortOrder || -1
        } else {
            sortOrder.createdAt = -1
        }

        const getOrder = await Order.find(orderQuery)
            .sort(sortOrder)
            .populate('customer', 'name email')
            .populate('items.productId', 'name category price')

        return getOrder
    } catch (error) {
        throw error
    }
}

// Get one specific order for customer
const getOrderById = async (orderId) => {
    try {

    } catch (error) {
        throw error
    }
}

// Update order status
const updateOrderStatus = async (orderId, newStatus) => {
    try {

    } catch (error) {
        throw error
    }
}

module.exports = {
    placeOrder,
    getCustomerOrders,
    getOrderById,
    updateOrderStatus
}