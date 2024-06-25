import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Checkbox, Input, Button, Typography, Row, Col, ConfigProvider } from "antd";
import AuthService from "../utils/auth";
import { LOGIN } from "../utils/mutations";
import AuthContext from "../context/AuthContext";
import '../styles/Login.css';

const { Title } = Typography;

const Login = () => {
  const { setUser, setIsLoggedIn } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [login, { loading: loginLoading, error: loginError }] = useMutation(LOGIN);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (values) => {
    try {
      const { data } = await login({
        variables: { ...values },
      });
      console.log('Login data:', data);
      AuthService.login(data.login.token);

      const decoded = AuthService.getProfile();
      console.log('Decoded token:', decoded);
      setUser(decoded);
      setIsLoggedIn(true);

      setFormData({
        email: '',
        password: '',
      });

      navigate(`/`);
    } catch (err) {
      console.error('Login error:', err.message);
    }
  };

  return (
   <Row justify={"center"}>
    <Col>
     <ConfigProvider
     theme={{}}>
      <Form
        id="login-form"
        onFinish={handleSubmit}
        initialValues={formData}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          marginTop: '10rem',
        }}
      >
        <Title     
          level={2}
          style={{
            marginLeft: '9rem',
          }}>
          Log In
        </Title>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
         wrapperCol={{
          offset: 8,
          span: 16,
        }}>

        <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 4, span: 16 }}
        >
            <Checkbox>Remember me</Checkbox>
        </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            style={{width: '11.75rem'}}
            loading={loginLoading}>
            Login
          </Button>
          {loginError && <p style={{ color: 'red' }}>Login Error: {loginError.message}</p>}
        </Form.Item>

        <Form.Item wrapperCol={{
          offset: 8,
          span: 16,
        }}>
          <Link to='/password-reset-request' style={{display: 'flex', justifyContent: 'center'}}>Forgot Password?</Link>
        </Form.Item>
      </Form>
     </ConfigProvider>
    </Col>
   </Row>
  );
};

export default Login;