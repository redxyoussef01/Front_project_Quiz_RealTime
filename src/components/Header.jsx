import React from 'react';
import { Avatar, Dropdown, Menu, Typography } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const CustomHeader = () => {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      // Clear token from local storage
      localStorage.removeItem('token');
      // Redirect to login page
      navigate('/login');
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      
      <div style={{ position: 'relative' }}>
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          <Avatar icon={<UserOutlined />} style={{ marginTop: '-25px', cursor: 'pointer' }} />
        </Dropdown>
      </div>
    </div>
  );
};

export default CustomHeader;
