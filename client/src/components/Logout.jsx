import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import AuthService from '../utils/auth';
import { LOGOUT } from '../utils/mutations';
import AuthContext from '../context/AuthContext';

const Logout = () => {
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [logout] = useMutation(LOGOUT, {
    context: {
        headers: {
            authorization: `Bearer ${AuthService.getToken()}`,
        },
    },
  });

  const handleLogout = async () => {
    try {
      await logout();
      AuthService.logout();
      setIsLoggedIn(false);
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <Button icon={<LogoutOutlined />} onClick={handleLogout} style={{ border: 'none' }}>
      Logout
    </Button>
  );
};

export default Logout;
