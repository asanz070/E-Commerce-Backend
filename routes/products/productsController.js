const Product = require('../products/productsModel')

// Get Product
const getAllProducts = async (productData) => {
    try {
        const findProducts = await Product.find();
        return findProducts
    } catch (error) {
        throw new Error(error);

    }
}

// Create Product
const createProduct = async (productData) => {
    try {
        const newProduct = await Product.create(productData);
        return newProduct
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    createProduct,
    getAllProducts
}