const Product = require('../products/productsModel')

// Get Product
const getAllProducts = async (productData) => {
    try {
        // const findProducts = await Product.find(productData);
        // return findProducts

        const productObject = {};

        if (productData.category) {
            productObject.category = productData.category
        }

        const minPrice = 0;
        const maxPrice = Infinity;

        productObject.price = {
            $gte: productData.minPrice || minPrice,
            $lte: productData.maxPrice || maxPrice,
        }

        if (productData.inStock === true) {
            productObject.stock = { $gt: 0 }
        }

        const sortObject = {};

        if (productData.sort) {
            const sortOrder = productData.sortOrder === '1' ? -1 : 1;
            sortObject[productData.sort] = sortOrder
        }

        const sortedProduct = await Product.find(productObject).sort(sortObject)
        return sortedProduct
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

// Delete product by id
const deleteProductById = async (productId) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(productId)
        return deleteProduct
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById
}