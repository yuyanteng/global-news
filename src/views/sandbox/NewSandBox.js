import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import Home from './home/Home'
import UserList from './user-manage/UserList'
import RoleList from './right-manage/RoleList'
import RightList from './right-manage/RightList'
import NewsWrite from './news-manage/NewsWrite'
import NewsDraft from './news-manage/NewsWrite'
import NewsClassificatio from './news-manage/NewsClassificatio'
import ExamineNews from './examine-manage/ExamineNews'
import ExamineList from './examine-manage/ExamineList'
import ReleaseAwait from './release-manage/ReleaseAwait'
import ReleaseIssue from './release-manage/ReleaseIssue'
import Nopermission from './nopermission/Nopermission'

import './NewSandBox.css'

import { Layout } from 'antd';
const { Content } = Layout;

function NewSandBox() {
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className='site-layout'>
        <TopHeader></TopHeader>
        <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              overflow: 'auto'
            }}
          >
          <Routes>
            <Route path= '/home' element={<Home></Home>}></Route>
            <Route path= '/user-manage/list' element={<UserList></UserList>}></Route>
            <Route path= '/right-manage/role/list' element={<RoleList></RoleList>}></Route>
            <Route path= '/right-manage/right/list' element={<RightList></RightList>}></Route>
            <Route path= '/news-manage/news/write' element={<NewsWrite></NewsWrite>}></Route>
            <Route path= '/news-manage/news/draft' element={<NewsDraft></NewsDraft>}></Route>
            <Route path= '/news-manage/news/classification' element={<NewsClassificatio></NewsClassificatio>}></Route>
            <Route path= '/examine-manage/examine/news' element={<ExamineNews></ExamineNews>}></Route>
            <Route path= '/examine-manage/examine/list' element={<ExamineList></ExamineList>}></Route>
            <Route path= '/release-manage/release/await' element={<ReleaseAwait></ReleaseAwait>}></Route>
            <Route path= '/release-manage/release/issue' element={<ReleaseIssue></ReleaseIssue>}></Route>
            <Route path="*" element={<Navigate replace from="*" to="/home"/>} />
            <Route path="/*" element={<Nopermission/>} />
          </Routes>
        </Content>
        
      </Layout>
    </Layout>
  )
}

export default NewSandBox
