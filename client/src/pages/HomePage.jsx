import React from 'react';
import Product from '../components/Product.jsx';
import { Row, Col } from 'antd';
import bagOne from '../assets/images/bag1.jpg';
import bagTwo from '../assets/images/bag2.jpg';
import bagThree from '../assets/images/bag3.jpg';
import bagFour from '../assets/images/bag4.jpg';
import bagFive from '../assets/images/bag5.jpg';
import bagSix from '../assets/images/bag6.jpg';

const products = [
    { title: 'Bag 1', imageUrl: bagOne },
    { title: 'Bag 2', imageUrl: bagTwo },
    { title: 'Bag 3', imageUrl: bagThree },
    { title: 'Bag 4', imageUrl: bagFour },
    { title: 'Bag 5', imageUrl: bagFive },
    { title: 'Bag 6', imageUrl: bagSix },
];

function HomePage() {


    return (
        <Row gutter={[16, 16]}>
            {products.map((product, index) => (
                <Col key={index} xs={24} sm={12} md={8}>
                    <Product title={product.title} imageUrl={product.imageUrl} />
                </Col>
            ))}
        </Row>
    );
}

export default HomePage;