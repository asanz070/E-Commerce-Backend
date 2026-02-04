const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema(
    {
        customer: {
            type: ObjectId,
            ref: 'Customer',
            required: true,
            unique: true
        },
        items: [
            {
                productId: {
                    type: ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ],
        total: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'shipped', 'delivered', 'cancelled'],
            default: 'pending'
        }
    }
)

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;