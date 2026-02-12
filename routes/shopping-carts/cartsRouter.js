const express = require('express');
const router = express.Router();

const { getCartByCustomerId, addItemToCart, removeItemFromCart, updateItemQuantity, clearCart } = require('./cartsController');

// Get cart by customer id
router.get('/:customerId', async (request, response) => {
    try {
        const cart = await getCartByCustomerId(request.params.customerId)
        response.status(200).json({ message: 'success', payload: cart })
    } catch (error) {
        response.status(404).json({ message: 'failure', payload: error.message })
    }
})

// Add item to cart
router.post('/:customerId/items', async (request, response) => {
    try {
        const updatedCart = await addItemToCart(
            request.params.customerId,
            request.body.productId,
            request.body.quantity
        )
        response.status(200).json({ message: 'success', payload: updatedCart })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error.message })
    }
})

// Remove item from cart
router.put