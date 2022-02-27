# 一步一步走

  Local:            http://localhost:3000
  On Your Network:  http://192.168.31.199:3000

## 安装依赖 
npm i --save sass  
npm i --save axios

npm i --save-dev http-proxy-middleware

npm i --save-dev react-router-dom     

npm i --save antd

### // 假数据全局安装
npm i -g json-server

### // 假数据全局安装
<!-- npm i --save react-particles-js -->
npm i tsparticles --save


### 创建json文件，来进行数据模拟
json-server --watch .\globalnew.json --port 9090

### 反向代理
src下创建setupProxy.js
```
  // 反向代理
  const { createProxyMiddleware } = require('http-proxy-middleware');

  module.exports = function(app) {
    // app.use(
    //   '/api',
    //   createProxyMiddleware({
    //     target: 'http://localhost:5000',
    //     changeOrigin: true,
    //   })
    // );
    app.use(
      '/ajax',
      createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
      })
    );
  };

```

### React-routerV6的版本升级
  ####  switch 更换为 routes
  /更换问*
  component 更换为 element
  没有 withRouter 了，所以直接改用 useNavigate 会更方便
  
  #### 跳转页面
  props.location.path name 可以用 useLocation 钩子取代，与 props.location 是一样的用法：
  import { useNavigate, useLocation } from "react-router";
  // ...
  let location = useLocation();
  const selectKeys = [location.pathname]; // ex: ['/home']
  const openKeys = ["/" + location.pathname.split("/")[1]];

  #### 跳转页面
  import { useNavigate } from "react-router";
  console.log("登录成功")
  localStorage.setItem("token", res.data[0])
  navigate("/");