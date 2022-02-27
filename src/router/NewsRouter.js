import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../views/sandbox/home/Home'
import UserList from '../views/sandbox/user-manage/UserList'
import RoleList from '../views/sandbox/right-manage/RoleList'
import RightList from '../views/sandbox/right-manage/RightList'
import NewsWrite from '../views/sandbox/news-manage/NewsWrite'
import NewsDraft from '../views/sandbox/news-manage/NewsWrite'
import NewsClassificatio from '../views/sandbox/news-manage/NewsClassificatio'
import ExamineNews from '../views/sandbox/examine-manage/ExamineNews'
import ExamineList from '../views/sandbox/examine-manage/ExamineList'
import ReleaseAwait from '../views/sandbox/release-manage/ReleaseAwait'
import ReleaseIssue from '../views/sandbox/release-manage/ReleaseIssue'
import ReleaseSunset from '../views/sandbox/release-manage/ReleaseSunset'
import Nopermission from '../views/sandbox/nopermission/Nopermission'

export default function NewsRouter() {
  return (
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
      <Route path= '/release-manage/release/unpublished' element={<ReleaseAwait></ReleaseAwait>}></Route>
      <Route path= '/release-manage/release/published' element={<ReleaseIssue></ReleaseIssue>}></Route>
      <Route path= '/release-manage/release/sunset' element={<ReleaseSunset></ReleaseSunset>}></Route>
      <Route path="*" element={<Navigate replace from="*" to="/home"/>} />
      <Route path="/*" element={<Nopermission/>} />
  </Routes>
  )
}
