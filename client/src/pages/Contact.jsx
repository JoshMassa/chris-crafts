import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { validateEmail } from "../../../server/utils/helpers";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [messageText, setMessageText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [form] = Form.useForm();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "phone") {
      setPhone(value);
    } else if (name === "message") {
      setMessageText(value);
    }

    if (errorMessage.toLowerCase().includes(name.toLowerCase())) {
      setErrorMessage("");
    }
  };

  const handleFormSubmit = () => {
    message.success("Form submitted successfully!");

    // Timeout to clear the success message from the form after 5 seconds
    setTimeout(() => {
      message.destroy();
    }, 5000);

    // If the form submission was successful, reset the fields to an empty string
    setName("");
    setEmail("");
    setPhone("");
    setMessageText("");
    setErrorMessage("");
    form.resetFields();
  };

  const handleFormSubmitFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleInputBlur = (event) => {
    const { name, value } = event.target;

    if (!value.trim()) {
      setErrorMessage(
        `${name.charAt(0).toUpperCase() + name.slice(1)} field is required.`
      );
    } else if (name === "email" && !validateEmail(value)) {
      setErrorMessage("Email is not in the correct format.");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        height: "650px",
        margin: "0 auto",
        backgroundColor: "#19647E",
        borderRadius: "10px",
        boxShadow: "0px 0px 15px 8px #888888",
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto", marginTop: "6rem" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: 20,
            paddingTop: 20,
            color: "white",
          }}
        >
          Contact Me
        </h1>
        <p
          style={{
            textAlign: "center",
            marginBottom: 20,
            color: "white",
            fontWeight: "600",
          }}
        >
          Please leave your name, email, phone number (optional), and a message
          detailing the custom leatherwork you're looking for. I will get back
          to you with more information as soon as possible!
        </p>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          onFinishFailed={handleFormSubmitFailed}
        >
          <Form.Item
            label={<span style={{ color: "white" }}>Name</span>}
            name="name"
            rules={[{ required: true, message: "Name field is required." }]}
          >
            <Input
              name="name"
              value={name}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
          </Form.Item>
          <Form.Item
            label={<span style={{ color: "white" }}>Email</span>}
            name="email"
            rules={[
              { required: true, message: "Email field is required." },
              { type: "email", message: "Email is not in the correct format." },
            ]}
          >
            <Input
              name="email"
              value={email}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
          </Form.Item>
          <Form.Item
            label={
              <span style={{ color: "white" }}>
                Phone (optional - texting preferred)
              </span>
            }
            name="phone"
            rules={[{ required: false }]}
          >
            <Input
              name="phone"
              value={phone}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
          </Form.Item>
          <Form.Item
            label={<span style={{ color: "white" }}>Message</span>}
            name="message"
            rules={[{ required: true, message: "Message field is required." }]}
          >
            <Input.TextArea
              name="message"
              value={messageText}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              rows={5}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              className="contact-submit-button"
              style={{
                width: 200,
                height: 50,
                backgroundColor: "#3F4045",
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact;
