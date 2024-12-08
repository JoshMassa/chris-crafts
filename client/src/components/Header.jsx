import React, { useContext } from "react";
import {
  SignatureOutlined,
  LoginOutlined,
  SettingOutlined,
  ContactsOutlined,
  CalendarOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Logout from "./Logout";
import "../styles/Header.css";
import logo from "../assets/images/chris-crafts-logo2.png";
import { useCart } from "../context/CartContext";

const { Header: AntHeader } = Layout;

function Header() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { cart } = useCart();

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const itemsOne = [
    {
      label: (
        <a href="/" onClick={handleHomeClick}>
          <img src={logo} style={{ paddingTop: 15, marginLeft: 30 }} />
        </a>
      ),
      key: "homePage",
    },
  ].filter(Boolean); // Filter out any falsey values (e.g., when isLoggedIn is false)

  const itemsTwo = [
    {
      label: <Link to="/event-calendar">Event Calendar</Link>,
      key: "eventCalendar",
      icon: <CalendarOutlined />,
    },
    {
      label: <Link to="/contact">Contact</Link>,
      key: "contact",
      icon: <ContactsOutlined />,
    },
    !isLoggedIn && {
      label: <Link to="/signup">Sign Up</Link>,
      key: "signUp",
      icon: <SignatureOutlined />,
    },
    !isLoggedIn && {
      label: <Link to="/login">Log In</Link>,
      key: "logIn",
      icon: <LoginOutlined />,
    },
    isLoggedIn && {
      label: (
        <Link to={`/user/${user ? user.username : ":username"}`}>
          Dashboard
        </Link>
      ),
      key: "userDashboard",
      icon: <SettingOutlined />,
    },
    isLoggedIn && {
      label: (
        <span>
          <Link to={`/user/${user ? user.username : ":username"}/cart`}>
            Cart
          </Link>
          {cart.length > 0 && (
            <span className="item-count">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </span>
      ),
      key: "cart",
      icon: <ShoppingCartOutlined />,
    },
    isLoggedIn && {
      label: <Logout />,
      key: "logout",
    },
  ].filter(Boolean);

  return (
    <AntHeader
      style={{
        display: "flex",
        borderBottom: "1px solid black",
      }}
    >
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["current"]}
        items={itemsOne}
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          alignItems: "center",
        }}
      />
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["current"]}
        items={itemsTwo}
        style={{
          paddingRight: "10rem",
          minWidth: 0,
          display: "flex",
          alignItems: "center",
        }}
      />
    </AntHeader>
  );
}

export default Header;
