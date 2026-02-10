const express = require('express');
const router = express.Router();

const { getAllCustomer, getCustomerById, createCustomer, updateCustomerById, deleteCustomerById } = require('./customersController');

// GET All Customer
router.get('/', async (request, response) => {
    try {
        const getCustomer = await getAllCustomer(request.query);
        response.status(200).json({ message: 'success', payload: getCustomer })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error })
    }
})

// Get Customer by ID
router.get('/:customerId', async (request, response) => {
    try {
        const customerId = await getCustomerById(request.params.customerId)
        response.status(200).json({ message: 'success', payload: customerId })
    } catch (error) {
        response.status(404).json({ message: 'failure', payload: error.message })
    }
})

// Create a new Customer
router.post('/', async (request, response) => {
    try {
        const newCustomer = await createCustomer(request.body);
        response.status(201).json({ message: 'success', payload: newCustomer })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error })
    }
})

// Update Customer by ID
router.put('/:customerId', async (request, response) => {
    try {
        const updateCustomer = await updateCustomerById(request.params.customerId, request.body)
        response.status(200).json({ message: 'success', payload: updateCustomer })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error })
    }
})

// Delete Customer by ID
router.delete('/:customerId', async (request, response) => {
    try {
        const deleteCustomer = await deleteCustomerById(request.params.customerId
        )
        response.status(200).json({ message: 'success', payload: deleteCustomer })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error.message })
    }
})

module.exports = router