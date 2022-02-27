import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Button, Modal, Tree } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'


const { confirm } = Modal;
export default function RoleList() {
  const [dataSource, setDataSource] = useState([])
  const [rightsSource, setRightsSource] = useState([])
  const [currentRights, setCurrentRights] = useState([])
  const [currentId, setCurrentId] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [refresh] = useState(false);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render:(id) => {
        return <b>{id}</b>
      }
    },
    {
      title: 'ID',
      dataIndex: 'id',
      render:(id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '操作',
      render:(item) => {
        return <div>
          <Button 
            type="dashed"
            shape="circle"
            danger icon = {<DeleteOutlined />}
            onClick = { () => confirmDelMethod(item)}
          />
          <Button 
              type="primary"
              shape="circle"
              ghost
              icon = {<EditOutlined />}
              onClick = { () => editMethod(item)}
            />
        </div>
      }
    }
  ]
  
  useEffect(() => {
    axios.get("http://localhost:9000/roles").then(res => {
      console.log(res.data)
      setDataSource(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:9000/rights?_embed=children").then(res => {
      console.log(res.data)
      setRightsSource(res.data)
    })
  }, [refresh])

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
  
  const delectMethod = (item) => {
    console.log(item)
    setDataSource(dataSource.filter(data => data.id !== item.id))
    axios.delete(`http://localhost:9000/roles/${item.id}`)
  }

  const editMethod = (item) => {
    setIsModalVisible(true)
    setCurrentRights(item.rights)
    setCurrentId(item.id)
  }
  const handleOk = () => {
    setIsModalVisible(false)
    setDataSource(dataSource.map(item => {
      if(item.id === currentId) {
        return {
          ...item,
          rights:currentRights
        }
      }
      return item
    }))
    axios.patch(`http://localhost:9000/roles/${currentId}`, {
      rights:currentRights
    })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const onCheck = (checkedKeys) => {
    setCurrentRights(checkedKeys.checked)
  }
  return (
    <div>
      <Table
        dataSource= {dataSource}
        columns= {columns}
        rowKey={((item) => item.id)}
      ></Table>
    <Modal title="权限分配" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Tree
        checkable
        checkedKeys = {currentRights}
        treeData={rightsSource}
        onCheck={onCheck}
        checkStrictly={true}
      />
    </Modal>
    </div>
  )
}
