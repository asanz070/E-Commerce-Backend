const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const cartSchema = new mongoose.Schema(
    {
        customer: {
            type: ObjectId,
            ref: 'Customer', // refference the customer model
            required: true,
            unique: true
        },
        items: [
            {
                productId: {
                    type: ObjectId,
                    ref: 'Product',
                    required: true
                }
            }
        ]
    }
)