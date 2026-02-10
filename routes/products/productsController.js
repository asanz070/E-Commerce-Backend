const Product = require('../products/productsModel')

// Get Product
const getAllProducts = async (productData) => {
    try {
        const findProducts = await Product.find(productData);
        return findProducts
    } catch (error) {
        throw error;

    }
}

// Get Product by ID
const getProductById = async (productID) => {
    try {
        const itemId = await Product.findById(productID)
        return itemId
    } catch (error) {
        throw error;
    }
}

// Create Product
const createProduct = async (productData) => {
    try {
        const newProduct = await Product.create(productData);
        return newProduct
    } catch (error) {
        throw error;
    }
}

// Update Product by Id
const updateProductById = async (productId, productData) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(
            productId,
            productData,
            { new: true }
        )
        return updateProduct
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById
}