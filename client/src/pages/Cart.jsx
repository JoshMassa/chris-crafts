import React from "react";
import { useCart } from "../context/CartContext";
import Product from "../components/Product";
import PayPalButton from "../components/PayPalButton";
import emptyCartImage from "../assets/images/empty-cart.jpg";
import "../styles/Cart.css";

function Cart() {
  const { cart, loading, error } = useCart();
  console.log("Cart", cart);

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const estimatedTax = () => {
    return calculateTotal() * 0.0635;
  };

  const orderTotal = () => {
    return (calculateTotal() + estimatedTax()).toFixed(2);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div
      className="cart-container"
      style={{ textAlign: "center", marginTop: "2rem", fontSize: "20px" }}
    >
      <h2 style={{ marginBottom: "1rem" }}>Your Cart</h2>
      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty!</p>
          <img
            src={emptyCartImage}
            alt="your-cart-is-empty"
            style={{ marginTop: "2rem" }}
          />
        </div>
      ) : (
        <div
          className="cart-items"
          style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
        >
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
          <div
            className="checkout-container"
            style={{
              width: "400px",
              backgroundColor: "white",
              maxHeight: "300px",
              padding: "30px",
            }}
          >
            <div
              className="cart-total"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                fontSize: "14px",
              }}
            >
              <p>Cart Total: ${calculateTotal().toFixed(2)}</p>
              <p style={{ margin: "2px 0px" }}>Shipping & Handling: $0.00</p>
              <p>Estimated tax to be collected: ${estimatedTax().toFixed(2)}</p>
              <p
                style={{
                  fontSize: "24px",
                  borderBottom: "1px solid grey",
                  margin: "10px 0px",
                  paddingBottom: "15px",
                }}
              >
                <strong>Order Total: ${orderTotal()}</strong>
              </p>
              <PayPalButton total={parseFloat(orderTotal())} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
