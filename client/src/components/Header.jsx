import React, { useContext } from 'react';
import {
  HomeOutlined,
  SignatureOutlined,
  LoginOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Logout from './Logout';
import '../styles/Header.css';
import logo from '../assets/images/chris-crafts-logo2.png';

const { Header: AntHeader } = Layout;

function Header() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/');
    window.location.reload();
  };

  const itemsOne = [
    {
      label: <a href='/' onClick={handleHomeClick}><img src={logo} style={{paddingTop: 30, marginLeft: 10}} /></a>,
      key: 'homePage',
    },
  ].filter(Boolean); // Filter out any falsey values (e.g., when isLoggedIn is false)

  const itemsTwo = [
    !isLoggedIn && {
        label: <Link to='/signup'>Sign Up</Link>,
        key: 'signUp',
        icon: <SignatureOutlined />,
      },
      !isLoggedIn && {
        label: <Link to='/login'>Log In</Link>,
        key: 'logIn',
        icon: <LoginOutlined />,
      },
      isLoggedIn && {
        label: <Link to={`/user/${user ? user.username : ':username'}`}>Dashboard</Link>,
        key: 'userDashboard',
        icon: <SettingOutlined />,
      },
      isLoggedIn && {
        label: <Logout />,
        key: 'logout',
      },
  ]

  return (
    <AntHeader
      style={{
        display: 'flex',
      }}
    >

      <Menu
        mode="horizontal"
        defaultSelectedKeys={['current']}
        items={itemsOne}
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          alignItems: 'center',
        }}
      />
      <Menu
        mode="horizontal"
        defaultSelectedKeys={['current']}
        items={itemsTwo}
        style={{
            paddingRight: '5rem',
            minWidth: 0,
            display: 'flex',
            alignItems: 'center',
        }}
        />
    </AntHeader>
  );
}

export default Header;
