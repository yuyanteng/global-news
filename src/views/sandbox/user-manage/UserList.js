
import React, { useEffect, useRef, useState } from 'react';

import {Button, Table, Modal, Switch} from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import axios from 'axios';

import UserForm from '../../../components/sandbox/user-manage/UserForm';


const { confirm } = Modal;


export default function UserList() {
  const [dataSource, setDataSource] = useState([])
  const [regionList, setRegionList] = useState([])
  const [rolesList, setRolesnList] = useState([])
  const [isAddUserVisible, setIsAddUserVisible] = useState(false);
  const [isEditVisible, setIsEditVisibled] = useState(false);
  const [isEditDisable, setIsEditDisabled] = useState(false);
  
  const [current, setCurrent] = useState(null)
  const [refresh] = useState(false);
  const addForm = useRef()
  const editForm = useRef()
  
  // 根据登录者进行 用户列表 权限分配查看内容
  const { roleId, region, username} = JSON.parse(localStorage.getItem("token"))

  useEffect(() => {
    axios.get("http://localhost:9000/users?_expand=role").then(res => {
      const list = res.data
      // 左侧列表数据
      setDataSource(list)
    })
  }, [refresh])
  
  useEffect(() => {
    axios.get("http://localhost:9000/regions").then(res => {
      const list = res.data
      // 区域数据 过滤登录用户权限 
      const roleObj = {
        "1": "superadmin",
        "2": "admin",
        "3": "editor",
      }
      setRegionList(roleObj[roleId] === "superadmin" ?list:[
        ...list.filter(item=>item.username===username),
        ...list.filter(item=>item.region === region && roleObj[item.roleId] === "editor")

      ])
    })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:9000/roles").then(res => {
      const list = res.data
      // 角色数据
      setRolesnList(list)
    })
  }, [])

  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      filters: [
        ...regionList.map(item => ({
          text: item.title,
          value: item.value
        })),
        {
          text: '全球',
          value: ''
        }
      ],
      onFilter: (value,item) => {
        return item.region === value
      },
      render:(region) => {
        return <b>{region === ''?'全球':region}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render:(role) => {
        return role?.roleName
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render:(roleState,item) => {
        return <Switch
          disabled={item.default}
          checked={roleState}
          onChange={() => roleStateChange(item)}
        ></Switch>
      }
    },
    {
      title: '操作',
      render:(item) => {
        return (<div>
          <Button 
            type="primary"
            shape="circle"
            ghost
            icon = {<EditOutlined />}
            disabled={item.default}
            onClick = { () => confirmEditMethod(item)}
          />
          <Button 
            type="dashed"
            shape="circle"
            danger icon = {<DeleteOutlined />}
            onClick = { () => confirmDelMethod(item)}
            disabled={item.default}
          />
        </div>)
      }
    }
  ];

  const confirmDelMethod = (item) => {
    confirm({
      title: '你确定要删除吗？',
      icon: <ExclamationCircleOutlined />,
      content: '真的删除了吗？',
      onOk() {
        delectMethod(item)
        // console.log('OK');
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  }
  // 删除用户
  const delectMethod = (item) => {
    console.log(item)
    setDataSource(dataSource.filter(data => data.id !== item.id))
    axios.delete(`http://localhost:9000/users/${item.id}`)
  }
  // 添加用户
  const addFormFn = () => {
    addForm.current.validateFields().then(value => {
      setIsAddUserVisible(false)

      addForm.current.resetFields()

      axios.post(`http://localhost:9000/users`, {
        ...value,
        "roleState": true,
        "default": false,
      }).then(res => {
        setDataSource([...dataSource, {...res.data, role: rolesList.filter(item => item.id === value.roleId)[0]}])
      })
    }).catch(err => {
      console.log(err)
    })
  }
  // 更新用户状态
  const roleStateChange = (item) => {
    console.log(item)
    item.roleState = !item.roleState
    setDataSource([...dataSource])
    axios.patch(`http://localhost:9000/users/${item.id}`, {
      roleState: item.roleState
    })
  }
  //编辑用户
  const confirmEditMethod =(item) => {
    setTimeout(() => {
      setIsEditVisibled(true)
      if(item.roleId === 1) {
        setIsEditDisabled(true)
      } else {
        setIsEditDisabled(false)
      }
      editForm.current.setFieldsValue(item)
    }, 0);
    setCurrent(item)
  }
  const editFormFn =() => {
    editForm.current.validateFields().then(value => {
      setIsEditVisibled(false)

      editForm.current.resetFields()
      setDataSource(dataSource.map(item => {
        if(item.id === current.id) {
          return {
            ...item,
            ...value,
            role: rolesList.filter(data => data.id === value.roleId)[0]
          }
        }
        return item
      }))
      setIsEditDisabled(!isEditDisable)
      axios.patch(`http://localhost:9000/users/${current.id}`, value)
    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <div>
      <Button
        type='primary'
        onClick={() => {
          setIsAddUserVisible(true)
        }}
      >添加用户</Button>
      <Table 
        dataSource={dataSource}
        columns={columns}
        pagination={{pageSize:5}}
        rowKey={item => item.id}
      />

      <Modal
        visible={isAddUserVisible}
        title="新增用户"
        okText="添加"
        cancelText="取消"
        onCancel={() => {
          setIsAddUserVisible(false)
        }}
        onOk={() => {addFormFn()}}
      >
        <UserForm
          regionList={regionList}
          rolesList={rolesList}
          ref={addForm}>
        </UserForm>
      </Modal>

      <Modal
        visible={isEditVisible}
        title="编辑用户"
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          setIsEditVisibled(false)
          setIsEditDisabled(!isEditDisable)
        }}
        onOk={() => {
          editFormFn()
        }}
      >
        <UserForm
          regionList={regionList}
          rolesList={rolesList}
          ref={editForm}
          isEditDisable = {isEditDisable}
          isEdit= {true}
          >
        </UserForm>
      </Modal>
    </div>
  );
}
