import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
    product: { 
        type: {
            _id: mongoose.Schema.Types.ObjectId,
            title: String,
            image: String,
            price: Number,
            description: String,
        },
        required: true,
    },
    quantity: { 
        type: Number,
        default: 1,
    },
});

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [CartItemSchema],
});

const Cart = mongoose.model('Cart', CartSchema );

export default Cart;