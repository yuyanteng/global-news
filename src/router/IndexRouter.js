import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Login from '../views/login/Login';
import NewSandBox from '../views/sandbox/NewSandBox';

export default function IndexRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<NewSandBox/>} />
      </Routes>
    </HashRouter>
  );
}
