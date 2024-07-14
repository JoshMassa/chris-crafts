import React from 'react';
import { Card, Button } from 'antd';
import '../styles/Product.css';

function Product({ title, image, price, description }) {
    return (
        <div className='product-container' >
            <Card className='product-card' cover={<img src={image} alt={title} />}>
                <Card.Meta title={title} /> 
                <div style={{ marginTop: '16px' }}>
                    <p><strong>Price:</strong> ${price}</p>
                    <p style={{minHeight: '50px'}}>{description}</p>
                    <Button 
                        type="success" 
                        style={{display: 'flex', margin: '0 auto', boxShadow: '0px 0px 3px 2px #134074', backgroundColor: '#0DAB76', color: 'white', fontWeight: '600'}}>
                        Buy Now
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default Product;