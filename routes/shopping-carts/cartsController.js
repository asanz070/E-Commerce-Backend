// Import Cart and Product models
const Cart = require('../shopping-carts/cartsModel')
const Product = require('../products/productsModel');

// Get carts for customer
const getCartByCustomerId = async (customerId) => {
    try {
        const findCart = await Cart.findOne({ customer: customerId })
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

        const product = await Product.findById(productId);

        if (!product) {
            throw new Error('Product Not Found')
        }

        let cart = await Cart.findOne({ customer: customerId });

        if (!cart) {
            cart = await Cart.create({
                customer: customerId,
                items: [{ productId, quantity }]
            });
        } else {
            const itemIndex = cart.items.findIndex(
                item => item.productId.toString() === productId
            );

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity })
            }
            await cart.save();
        }

        const updatedCart = await cart.populate('items.productId', 'name category price')
        return updatedCart;
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

        const newCart = await cart.populate('items.productId', 'name category price');
        return newCart
    } catch (error) {
        throw error
    }
}

// Update Item Quantity
const updateItemQuantity = async (customerId, productId, quantity) => {
    try {
        const foundCart = await Cart.findOne({ customer: customerId })

        if (!foundCart) {
            throw new Error('Cart Not Found')
        }

        const item = foundCart.items.find(
            item => item.productId.toString() === productId
        );

        if (!item) {
            throw new Error('Item not found in cart')
        }

        item.quantity = quantity;
        await foundCart.save()

        const newCart = await foundCart.populate('items.productId', 'name category price')
        return newCart
    } catch (error) {
        throw error
    }
}

// Clear cart by id
const clearCart = async (customerId) => {
    try {
        const deleteCart = await Cart.findOne({ customer: customerId })

        if (!deleteCart) {
            throw new Error("Cart Not Found")
        }

        deleteCart.items = []
        await deleteCart.save()

        return deleteCart
    } catch (error) {
        throw error
    }
}

module.exports = {
    getCartByCustomerId,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    clearCart
}