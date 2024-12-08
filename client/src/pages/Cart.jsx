import React from "react";
import { useCart } from "../context/CartContext";
import Product from "../components/Product";
import { Form, Input, Button, Card, Row, Col } from "antd";
import PayPalButton from "../components/PayPalButton";
import emptyCartImage from "../assets/images/empty-cart.jpg";
import StateSelect from "../components/StateSelect";
import CountrySelect from "../components/CountrySelect";
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

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      className="cart-container"
      style={{ textAlign: "center", marginTop: "2rem", fontSize: "20px" }}
    >
      <Card
        style={{ marginBottom: "20px", border: "1px solid black" }}
        title="Shipping Address"
      >
        <Form
          name="shipping"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ textAlign: "left" }}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <label>Full Name (First and Last)</label>
            <Input placeholder="Full Name" />
          </Form.Item>

          <Form.Item
            name="address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <label>Street Address</label>
            <Input placeholder="Street Number & Name" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="city"
                rules={[{ required: true, message: "Please enter your city" }]}
              >
                <label>City</label>
                <Input placeholder="City" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="state"
                rules={[
                  { required: true, message: "Please select your state" },
                ]}
                style={{ display: "block" }}
              >
                <label>State</label>
                <StateSelect />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="zip"
                rules={[
                  { required: true, message: "Please enter your zip code" },
                ]}
              >
                <label>ZIP Code</label>
                <Input placeholder="Zip Code" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="country"
            rules={[{ required: true, message: "Please select your country" }]}
          >
            <label>Country</label>
            <CountrySelect />
          </Form.Item>

          <Form.Item>
            <Button
              style={{
                display: "flex",
                margin: "0 auto",
                backgroundColor: "#0DAB76",
                fontWeight: 600,
                boxShadow: "0px 0px 3px 2px #134074",
              }}
              type="primary"
              htmlType="submit"
            >
              Set Shipping Address
            </Button>
          </Form.Item>
        </Form>
      </Card>

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
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <Row gutter={[16, 16]}>
            {cart.map((item, index) => (
              <Col xs={24} sm={12} md={8}>
                <Product
                  key={index}
                  title={item.product.title}
                  image={item.product.image}
                  price={item.product.price}
                  description={item.product.description}
                  quantity={item.quantity}
                  showAddToCartButton={false}
                />
              </Col>
            ))}
          </Row>
          <div
            className="checkout-container"
            style={{
              width: "400px",
              backgroundColor: "white",
              maxHeight: "300px",
              padding: "30px",
              borderRadius: "10px",
              marginBottom: "20px",
              border: "1px solid black",
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
