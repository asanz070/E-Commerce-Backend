// Import Cart and Product models
const Cart = require('../shopping-carts/cartsModel')
const Product = require('../products/productsModel');

// Get all carts
const getAllCarts = async (cartData) => {
    try {
        const findCart = await Cart.find(cartData)
            .populate('customer', 'name email') // populate customer details
            .populate('items.productId', 'name price'); // populate product details in items

        // total calculation for each cart
        findCart.forEach(cart => {
            cart.total = cart.items.reduce((total, item) => {
                return total + (item.productId.price * item.quantity);
            }, 0);
        });
        return findCart
    } catch (error) {
        throw error
    }
}

// Get Cart by customer ID
const getCartByCustomerId = async (customerId, productId, quantity) => {
    try {
        const cart = await Cart.findOne({ customer: customerId });

        if (!cart) {
            throw new Error('Cart not found for the customer');
        }
        const product = await Product.findById(productId);

        if (!product) {
            throw new Error('Product not found');
        }
        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (existingItemIndex >= 0) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }
        await cart.save();
        return cart;
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllCarts,
    getCartByCustomerId
}