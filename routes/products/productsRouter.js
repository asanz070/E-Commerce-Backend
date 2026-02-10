const express = require('express');
const router = express.Router();

const { getAllProducts, createProduct } = require('../products/productsController');

// Get all products
router.get('/', async (request, response) => {
    try {
        const getProduct = await getAllProducts(request.query);
        response.status(200).json({ message: 'success', payload: getProduct })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error })
    }
})

// Create a new product
router.post('/', async (request, response) => {
    try {
        const newProducts = await createProduct(request.body);
        response.status(200).json({ message: 'success', payload: newProducts })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error })
    }
})

module.exports = router