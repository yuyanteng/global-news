import React from 'react';
import { useNavigate } from "react-router";
import { Form, Input, Button, Checkbox } from 'antd';
// 粒子效果引入（失败）
// import { tsParticles } from "tsparticles";
import axios from 'axios';

import './login.css'
export default function Login() {
  let navigate = useNavigate();
  const onFinish = (values) => {
    // console.log('Success:', values);

    axios.get(`http://localhost:9000/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then(res => {
      // const list = res.data
      console.log(res.data)
      if(res.data.length === 0) {
        console.log("登录失败")
      } else {
        console.log("登录成功")
        localStorage.setItem("token", JSON.stringify(res.data[0]))
        navigate("/");
      }
      // 角色数据
    })

  };
  return (
    <div className='login-box'>
      <div id="tsparticles"></div>
      <div className='login-content' >
        <div className='login-content-title' >全球新闻发布管理系统</div>
        <Form
          name="login-form"
          className='login-form'
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>记住密码！</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
