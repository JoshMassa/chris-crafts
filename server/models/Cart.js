import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
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