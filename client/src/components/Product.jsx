import React, { useState } from 'react';
import { Card, Button, message } from 'antd';
import { ADD_ITEM_TO_CART } from '../utils/mutations.js';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/Product.css';
import { useMutation } from '@apollo/client';

function Product({ id, title, image, price, description, showAddToCartButton = true }) {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);
    const { user, isLoggedIn } = useAuth();

    const [addItemToCart] = useMutation(ADD_ITEM_TO_CART, {
        onCompleted: (data) => {
            message.success('Item successfully added to the cart!');
            setIsAdded(true);
            console.log('Cart updated:', data.addItemToCart);
        },
        onError: (error) => {
            console.error('Failed to add item to the cart:', error.message)
        }
    });

    const handleAddToCart = () => {
        if (!user) {
            message.error('You need to be logged in to add items to your cart!');
            return;
        }

        const product = { productId: id, title, image, price, description };
        console.log('Product to be added:', product);

        addItemToCart({
            variables: {
                userId: user._id,
                productId: id,
                quantity: 1,
            }
        });
    };

    return (
        <div className='product-container' >
            <Card className='product-card' cover={<img src={image} alt={title} />}>
                <Card.Meta title={title} /> 
                <div style={{ marginTop: '16px' }}>
                    <p><strong>Price:</strong> ${price}</p>
                    <p style={{minHeight: '50px'}}>{description}</p>
                    {showAddToCartButton && isLoggedIn && (
                        <Button 
                            type="success" 
                            style={{
                                display: 'flex', 
                                margin: '0 auto', 
                                boxShadow: '0px 0px 3px 2px #134074', 
                                backgroundColor: '#0DAB76', 
                                color: 'white', 
                                fontWeight: '600'
                            }}
                            onClick={handleAddToCart}
                            disabled={isAdded}
                        >
                            {isAdded ? 'Added' : 'Add To Cart'}
                        </Button>
                    )}
                </div>
            </Card>
        </div>
    );
}

export default Product;