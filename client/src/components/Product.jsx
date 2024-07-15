import React, { useState } from 'react';
import { Card, Button, message } from 'antd';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/Product.css';

function Product({ id, title, image, price, description, showAddToCartButton = true }) {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);
    const { user, isLoggedIn } = useAuth();

    const handleAddToCart = () => {
        const product = { productId: id, title, image, price, description };
        addToCart(product, user._id);
        setIsAdded(true);
        message.success('Item successfully added to the cart!');
        console.log('Product to be added:', product)
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
                        >
                            Add To Cart
                        </Button>
                    )}
                </div>
            </Card>
        </div>
    );
}

export default Product;