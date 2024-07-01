import React from 'react';
import { Card } from 'antd';
import '../styles/Product.css';

function Product({ title, imageUrl }) {
    return (
        <Card className='product-card' cover={<img src={imageUrl} alt={title} />}>
            <Card.Meta title={title} />
        </Card>
    );
}

export default Product;