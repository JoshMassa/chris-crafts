import React from 'react';
import { useQuery } from '@apollo/client';
import Product from '../components/Product.jsx';
import { Row, Col, Button } from 'antd';
import { GET_PRODUCTS } from '../utils/queries.js';

function HomePage() {
    const { loading, error, data } = useQuery(GET_PRODUCTS);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const products = data.products;

    return (
        <div>
            <h1 style={{textAlign: 'center', margin: '25px', color: '#134074'}}>Thank you for visiting Chris' Crafts</h1>
            <h3 style={{textAlign: 'center', margin: '25px', color: '#134074'}}>Please take a look at our current inventory</h3>
            <Row gutter={[16, 16]}>
                {products.map((product, index) => (
                    <Col key={index} xs={24} sm={12} md={8}>
                        <Product 
                            title={product.title}
                            image={product.image}
                            price={product.price}
                            description={product.description}
                            />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default HomePage;