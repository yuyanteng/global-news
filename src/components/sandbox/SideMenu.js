import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router";
import axios from 'axios';

import { Layout, Menu } from 'antd';
import {
  UserOutlined,
} from '@ant-design/icons';
import './index.css'
const { Sider } = Layout;
const { SubMenu } = Menu;

// 侧边栏数组结构
// const menuList = [
//   {
//     key: '/home',
//     title: '首页',
//     icon: <UserOutlined />
//   },
//   {
//     key: '/user-manage',
//     title: '用户管理',
//     icon: <UserOutlined />,
//     children:[
//       {
//         key: '/user-manage/list',
//         title: '用户列表',
//         icon: <UserOutlined />
//       },
//     ]
//   },
//   {
//     key: '/right-manage',
//     title: '权限管理',
//     icon: <UserOutlined />,
//     children:[
//       {
//         key: '/right-manage/role/list',
//         title: '角色列表',
//         icon: <UserOutlined />
//       },
//       {
//         key: '/right-manage/right/list',
//         title: '用户列表',
//         icon: <UserOutlined />
//       },
//     ]
//   },
// ]

const iconList = {
  "/home" : <UserOutlined />,
  "/user-manage" : <UserOutlined />,
  "/user-manage/list" : <UserOutlined />,
  "/right-manage" : <UserOutlined />,
  "/right-manage/role/list" : <UserOutlined />,
  "/right-manage/right/list" : <UserOutlined />,
  "/news-manage" : <UserOutlined />,
  "/news-manage/news/write" : <UserOutlined />,
  "/news-manage/news/draft" : <UserOutlined />,
  "/news-manage/news/classification" : <UserOutlined />,
  "/examine-manage" : <UserOutlined />,
  "/examine-manage/examine/news" : <UserOutlined />,
  "/examine-manage/examine/list" : <UserOutlined />,
  "/release-manage" : <UserOutlined />,
  "/release-manage/release/await" : <UserOutlined />,
  "/release-manage/release/issue" : <UserOutlined />
}

function SideMenu() {
  let navigate = useNavigate()
  let location = useLocation();

  const [menuList, setMenuList] = useState([])
  useEffect(() => {
    axios.get("http://localhost:9000/rights?_embed=children").then(res => {
      // 左侧列表数据
      setMenuList(res.data)
    })
  },[])

  const {role: {rights}} = JSON.parse(localStorage.getItem("token"))

  const checkPagePermission = (item) => {
    // console.log(item.pagepermission)
    // 如果有pagepermission则渲染,判断当前登录用户的侧边栏路径
    return item.pagepermission && rights.includes(item.key)
  }

  const renderMenu = (menuList) => {
    return menuList.map(item => {
      if(checkPagePermission(item) && item.children?.length > 0) {
        return <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
          {renderMenu(item.children)}
        </SubMenu>
      }
      return (checkPagePermission(item) && <Menu.Item key={item.key} icon={iconList[item.key]} onClick={() => navigate(item.key)} >{item.title}</Menu.Item>)
    })
  }
  // route v5
  // const selectKeys = [props.location.pathname]
  // const openKeys = ["/" + props.location.pathname.split("/")[1]]

  // route v6
  const selectKeys = [location.pathname]; // ex: ['/home']
  const openKeys = ["/" + location.pathname.split("/")[1]];
  return (
    <Sider trigger={null} collapsible>
     <div className='right-box'>
      <div className="logo">新闻发布系统</div>
        <Menu theme="dark" mode="inline" selectedKeys={selectKeys} defaultOpenKeys={openKeys}>
          {
            renderMenu(menuList)
          }
        </Menu>
     </div>
    </Sider>
  );
}

export default  SideMenu