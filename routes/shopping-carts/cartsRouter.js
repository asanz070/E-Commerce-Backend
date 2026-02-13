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
        response.status(201).json({ message: 'success', payload: updatedCart })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error.message })
    }
})

// Update cart quantity
router.put('/:customerId/update/:productId', async (request, response) => {
    try {
        const updateCartQuantity = await updateItemQuantity(
            request.params.customerId,
            request.params.productId,
            request.body.quantity
        )
        response.status(200).json({ message: 'success', payload: updateCartQuantity })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error.message })
    }
})

// Remove item from cart
router.delete('/:customerId/remove/:productId', async (request, response) => {
    try {
        const removeItem = await removeItemFromCart(
            request.params.customerId,
            request.params.productId
        )
        response.status(200).json({ message: 'success', payload: removeItem })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error.message })
    }
})


// Clear Cart
router.delete('/:customerId/clear', async (request, response) => {
    try {
        const cleanCart = await clearCart(request.params.customerId)
        response.status(200).json({ message: 'success', payload: cleanCart })
    } catch (error) {
        response.status(404).json({ message: 'failure', payload: error.message })
    }
})

module.exports = router