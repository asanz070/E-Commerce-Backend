const express = require('express');
const router = express.Router();

const { getCartByCustomerId, addItemToCart, removeItemFromCart, updateItemQuantity, clearCart, clearCart } = require('./cartsController');

// Get cart by customer id
router.get('/:customerId', async (request, response) => {
    try {
        const cart = await getCartByCustomerId(request.params.customerId)
        response.status(200).json({ message: 'success', payload: cart })
    } catch (error) {
        response.status(404).json({ message: 'failure', payload: error })
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
        response.status(400).json({ message: 'failure', payload: error })
    }
})

// Remove item from cart
router.delete('/:customerId/items/:productId', async (request, response) => {
    try {
        const removeItem = await removeItemFromCart(
            request.params.customerId,
            request.params.productId
        )
        response.status(201).json({ message: 'success', payload: removeItem })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error })
    }
})

// Update cart quantity
router.put('/:customerId/items/:productId', async (request, response) => {
    try {
        const updateCartQuantity = await updateItemQuantity(
            request.params.customerId,
            request.body.productId
        )
        response.status(201).json({ message: 'success', payload: updateCartQuantity })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error })
    }
})

// Clear Cart
router.delete('/:customerId/clear', async (request, response) => {
    try {
        const cleanCart = await clearCart(request.params.customerId)
        response.status(200).json({ message: 'success', payload: cleanCart })
    } catch (error) {
        response.status(404).json({ message: 'failure', payload: error })
    }
})

module.exports = router