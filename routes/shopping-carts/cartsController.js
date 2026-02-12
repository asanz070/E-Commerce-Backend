// Import Cart and Product models
const Cart = require('../shopping-carts/cartsModel')
const Product = require('../products/productsModel');

// Get carts for customer
const getCartByCustomerId = async (customerId) => {
    try {
        const findCart = await Cart.findById({ customer: customerId })
            .populate('customer', 'name email') // populate customer details
            .populate('items.productId', 'name category price'); // populate product details in items

        // Calculation for total price
        if (findCart) {
            findCart.total = findCart.items.reduce((total, item) => {
                let cartTotal = total + (item.productId.price * item.quantity);
                return cartTotal;
            }, 0);
        }

        return findCart
    } catch (error) {
        throw error
    }
}

// Create the cart and add item to cart
const addItemToCart = async (customerId, productId, quantity) => {
    try {
        const cart = await Cart.findOne({ customer: customerId });

        if (!cart) {
            cart = await Cart.create({
                customer: customerId,
                items: [{ productId, quantity }]
            });
        } else {

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

// Remove Item from Cart
const removeItemFromCart = async (customerId, productId) => {
    try {
        const cart = await Cart.findOne({ customer: customerId })

        if (!cart) {
            throw new Error("Cart Not Found")
        }

        cart.items = cart.items.filter(
            item => item.productId.toString() !== productId
        );
        await cart.save();

        const newCart = await cart.populate('items.productId', 'name catergory price');
        return newCart
    } catch (error) {
        throw error
    }
}

// Update the cart by Id


// Clear cart by id
const clearCartById = async (cartId) => {
    try {
        const deleteCart = await Cart.findByIdAndDelete(cartId)
        return deleteCart
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllCarts,
    addItemToCart,
    clearCartById
}