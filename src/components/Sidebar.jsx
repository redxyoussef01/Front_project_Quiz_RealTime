import React, { useState } from 'react';
import { Flex, Menu } from 'antd';
import { FaHouse } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation from React Router
import { UserOutlined , LogoutOutlined, OrderedListOutlined, CarryOutOutlined, SettingOutlined } from '@ant-design/icons';
import { MdOutlineQuiz } from "react-icons/md";
import { MdOutlineQuestionAnswer } from "react-icons/md";
const { SubMenu } = Menu;
import { FcStatistics } from "react-icons/fc";
const Sidebar = () => {
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState([]);

  // Function to handle submenu open change
  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  // Function to get the parent keys of the active route
  const getParentKeys = (pathname) => {
    const paths = pathname.split('/').filter((p) => p);
    return paths.map((_, index) => `/${paths.slice(0, index + 1).join('/')}`);
  };

  return (
    <>
      <Flex align="center" justify="center">
        <div className="logo">
          <FaHouse />
        </div>
      </Flex>

      <Menu
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
        selectedKeys={[location.pathname]}
        defaultOpenKeys={openKeys}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        className="menu-bar"
      >
        {/* Use Link components from React Router */}
        <Menu.Item key="/" icon={<UserOutlined />} title="Dashboard">
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        
        <Menu.Item key="/quiz" icon={<MdOutlineQuiz />} title="quiz"><Link to="/quiz">Quiz</Link></Menu.Item>
        <Menu.Item key="/results" icon={<FcStatistics />} title="results"><Link to="/Results">Results</Link></Menu.Item>
      </Menu>
    </>
  );
};

export default Sidebar;
