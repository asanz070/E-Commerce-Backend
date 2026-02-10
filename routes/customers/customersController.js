const Customer = require('../customers/customersModel');

// Get Customer
const getAllCustomer = async (customerData) => {
    try {
        const findCustomer = await Customer.find(customerData);
        return findCustomer
    } catch (error) {
        throw error
    }
}

// Get customer by ID
const getCustomerById = async (customerID) => {
    try {
        const personId = await Customer.findById(customerID)
        return personId
    } catch (error) {
        throw error
    }
}

// Create the customer
const createCustomer = async (customerData) => {
    try {
        const newCustomer = await Customer.create(customerData)
        return newCustomer
    } catch (error) {
        throw error
    }
}

// Update the customer by id
const updateCustomerById = async (customerId, customerData) => {
    try {
        const updateCustomer = await Customer.findByIdAndUpdate(
            customerId,
            customerData,
            { new: true }
        )
        return updateCustomer
    } catch (error) {
        throw error
    }
}

// Delete the customer by id
const deleteCustomerById = async (customerId) => {
    try {
        const deleteCustomer = await Customer.findByIdAndDelete(customerId)
        return deleteCustomer
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllCustomer,
    getCustomerById,
    createCustomer,
    updateCustomerById,
    deleteCustomerById
}