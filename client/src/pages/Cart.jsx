import React from 'react';
import { useCart } from '../context/CartContext';
import Product from '../components/Product';
import PayPalButton from '../components/PayPalButton';
import emptyCartImage from '../assets/images/empty-cart.jpg';
import '../styles/Cart.css';

function Cart() {
    const { cart, loading, error } = useCart();
    console.log('Cart', cart)

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="cart-container" style={{ textAlign: 'center', marginTop: '2rem', fontSize: '20px' }}>
            <h2 style={{marginBottom: '1rem'}}>Your Cart</h2>
            {cart.length === 0 ? (
                <div>
                    <p>Your cart is empty!</p>
                    <img src={emptyCartImage} alt="your-cart-is-empty" style={{ marginTop: '2rem' }} />
                </div>
            ) : (
                <div className="cart-items" style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                    {cart.map((item, index) => (
                        <Product
                            key={index}
                            title={item.product.title}
                            image={item.product.image}
                            price={item.product.price}
                            description={item.product.description}
                            quantity={item.quantity}
                            showAddToCartButton={false}
                        />
                    ))}
                    <div className="cart-total" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '24px', paddingBottom: '20px' }}>
                        <p>Total: ${calculateTotal().toFixed(2)}</p>
                        <PayPalButton total={calculateTotal()} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;