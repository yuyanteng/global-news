
import React, { forwardRef, useState, useEffect } from 'react'

import {Form, Input, Select} from 'antd'

const { Option } = Select;

let UserForm = forwardRef((props,ref) => {
  const {rolesList, regionList, isEditDisabled, isEdit} = props
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
      // 角色数据
      setIsDisabled(isEditDisabled)
  }, [isEditDisabled])

  // 判断登录者管理自己区域的权限
  const { roleId, region, username} = JSON.parse(localStorage.getItem("token"))
  const roleObj = {
    "1": "superadmin",
    "2": "admin",
    "3": "editor",
  }
  const checkRegionDisabled = (item) => {
    if(isEdit) {
      if(roleObj[roleId] === "superadmin"){
        return false
      } else {
        return true
      }
    } else {
      if(roleObj[roleId] === "superadmin") {
        return false
      } else {
        return item.value !== region
      }
    }
  }
  const checkRoleDisabled = (item) => {
    if(isEdit) {
      if(roleObj[roleId] === "superadmin"){
        return false
      } else {
        return true
      }
    } else {
      if(roleObj[roleId] === "superadmin") {
        return false
      } else {
        return item.id !== 3
      }
    }
  }

  return (
    <Form
      ref={ref}
      layout="vertical"
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: '输入用户名!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: '输入密码!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="region"
          label="区域"
          rules={isDisabled ?[] :[{ required: true, message: '请选择区域!' }]}
        >
        <Select
          showSearch
          placeholder="选择区域"
          disabled={isDisabled}
        >
          {
            regionList.map((item) => {
              return <Option
                value={item.value}
                key={item.id}
                disabled = {checkRegionDisabled(item)}
              >
              {item.ti}
              </Option>
            })
          }
        </Select>
        </Form.Item>
        <Form.Item
          name="roleId"
          label="角色"
          rules={[{ required: true, message: '请选择角色!' }]}
        >
          <Select
            showSearch
            placeholder="选择角色"
            onChange={(value) => {
              if(value === '1') {
                setIsDisabled(true)
                ref.current.getFieldsValue({
                  regions: ''
                })
              } else {
                setIsDisabled(false)
              }
            }}
          >
            {
              rolesList.map((item) => {
                return <Option
                  value={item.value}
                  key={item.id}
                  disabled = {checkRoleDisabled(item)}
                >
                {item.roleName}
                </Option>
              })
            }
          </Select>
      </Form.Item>
    </Form>
  )
})

export default UserForm