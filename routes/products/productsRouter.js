const express = require('express');
const router = express.Router();

const { getAllProducts, createProduct, getProductById, updateProductById, deleteProductById } = require('../products/productsController');

// Get all products
router.get('/', async (request, response) => {
    try {
        const getProduct = await getAllProducts(request.query);
        response.status(200).json({ message: 'success', payload: getProduct })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error })
    }
})

// Get Product by ID
router.get('/:productId', async (request, response) => {
    try {
        const productId = await getProductById(request.params.productId)
        response.status(200).json({ message: 'success', payload: productId })
    } catch (error) {
        response.status(404).json({ message: 'failure', payload: error })
    }
})

// Create a new product
router.post('/', async (request, response) => {
    try {
        const newProducts = await createProduct(request.body);
        response.status(201).json({ message: 'success', payload: newProducts })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error })
    }
})

// Update the product by it's id
router.put('/:productId', async (request, response) => {
    try {
        const updateProduct = await updateProductById(request.params.productId, request.body)
        response.status(200).json({ message: 'success', payload: updateProduct })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error })
    }
})

// Delete product by id
router.delete('/:productId', async (request, response) => {
    try {
        const deleteProduct = await deleteProductById(request.params.productId)
        response.status(200).json({ message: 'success', payload: deleteProduct })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error })
    }
})

module.exports = router