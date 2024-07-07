import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

const Product = model('Product', productSchema);

export default Product;