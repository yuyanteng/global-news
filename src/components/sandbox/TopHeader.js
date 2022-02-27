import React, { useState } from 'react';
import { useNavigate } from "react-router";
// import {withRouter} from 'react-router-dom'  // 路由v5版本
import { Layout, Dropdown, Menu, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons';


const { Header } = Layout;

function TopHeader() {
  const [collapsed, setCollapsed] = useState(false)
  let navigate = useNavigate();
  // const { history } = props // 路由v5版本
  const changeCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const {role: {roleName}, username} = JSON.parse(localStorage.getItem("token"))
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          {roleName}
        </a>
      </Menu.Item>
      <Menu.Item danger onClick={() => {
        localStorage.removeItem("token")
        
        // history.replaceState("/login") // 路由v5版本
        navigate("/login");
      }} >
        退出
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
      {
        collapsed
        ? <MenuUnfoldOutlined onClick = {changeCollapsed} />
        : <MenuFoldOutlined onClick = {changeCollapsed}/>
       /*  React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: this.toggle,
      }) */
      }
      <div style={{float: 'right'}}>
      <span>欢迎{username}回来！</span>
      <Dropdown overlay={menu}>
        <Avatar size={24} icon={<UserOutlined />} />
      </Dropdown>
      </div>
    </Header>
  );
}

// export default  withRouter(TopHeader) // 路由v5版本
export default  TopHeader