import React, { useState } from "react";
import { Card, Button, message } from "antd";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/Product.css";

function Product({
  id,
  title,
  image,
  price,
  description,
  showAddToCartButton = true,
}) {
  const { addToCart, cart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const { user, isLoggedIn } = useAuth();

  const handleAddToCart = async () => {
    if (!user) {
      message.error("You need to be logged in to add items to your cart!");
      return;
    }

    const product = { productId: id, title, image, price, description };
    console.log("Product to be added:", product);

    try {
      await addToCart(product);
      setIsAdded(true);
      message.success("Item successfully added to the cart!");
    } catch (error) {
      console.error("Failed to add item to the cart:", error.message);
      message.error("Failed to add item to the cart!");
    }
  };

  return (
    <div className="product-container">
      <Card
        className="product-card"
        style={{ border: "1px solid black" }}
        cover={
          <img src={image} alt={title} style={{ border: "1px solid black" }} />
        }
      >
        <Card.Meta title={title} />
        <div style={{ marginTop: "16px" }}>
          <p>
            <strong>Price:</strong> ${price}
          </p>
          <p style={{ minHeight: "50px" }}>{description}</p>
          {showAddToCartButton && isLoggedIn && (
            <Button
              type="success"
              style={{
                display: "flex",
                margin: "0 auto",
                boxShadow: "0px 0px 3px 2px #134074",
                backgroundColor: "#0DAB76",
                color: "white",
                fontWeight: "600",
              }}
              onClick={handleAddToCart}
              disabled={isAdded}
            >
              {isAdded ? "Added" : "Add To Cart"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Product;
