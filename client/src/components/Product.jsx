import React from 'react';
import { Card } from 'antd';
import '../styles/Product.css';

function Product({ title, image, price, description }) {
    return (
        <div className='product-container'>
            <Card className='product-card' cover={<img src={image} alt={title} />}>
                <Card.Meta title={title} /> 
                <div style={{ marginTop: '16px' }}>
                    <p><strong>Price:</strong> ${price}</p>
                    <p>{description}</p>
                </div>
            </Card>
        </div>
    );
}

export default Product;