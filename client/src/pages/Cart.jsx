import React from 'react';
import { useCart } from '../context/CartContext';
import Product from '../components/Product';
import emptyCartImage from '../assets/images/empty-cart.jpg';
import '../styles/Cart.css';

function Cart() {
    const { cart } = useCart();

    console.log('Cart:', cart);

    return (
        <div className="cart-container" style={{ textAlign: 'center', marginTop: '4rem', fontSize: '20px' }}>
            <h2 style={{marginBottom: '1rem'}}>Your Cart</h2>
            {cart.length === 0 ? (
                <div>
                    <p>Your cart is empty!</p>
                    <img src={emptyCartImage} alt="your-cart-is-empty" style={{ marginTop: '2rem' }} />
                </div>
            ) : (
                <div className="cart-items">
                    {cart.map((item, index) => (
                        <Product
                            key={index}
                            title={item.product.title}
                            image={item.product.image}
                            price={item.product.price}
                            description={item.product.description}
                            quantity={item.product.quantity}
                            showAddToCartButton={false}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Cart;