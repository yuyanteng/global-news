import React, { useEffect, useState } from 'react';

import {Button, Table, Tag, Modal, Popover, Switch} from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import axios from 'axios';


const { confirm } = Modal;


export default function RoleList() {
  const [dataSource, setDataSource] = useState([])
  const [refresh] = useState(false);
  
  useEffect(() => {
    axios.get("http://localhost:9000/rights").then(res => {
      const list = res.data
      list.forEach(item => {
        if(item.children?.length === 0) {
          item.children = ""
        }
      });
      // 左侧列表数据
      setDataSource(list)
    })
  }, [refresh])
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render:(id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render:(key) => {
        return <Tag color="orange">{key}</Tag>
      }
    },
    {
      title: '操作',
      render:(item) => {
        return (<div>
          <Popover
            content={<div style={{textAlign:"center"}}>
                <Switch
                  checked={item.pagepermission}
                  onChange={switchMethod(item)}>
                </Switch>
              </div>
            }
            title="页面配置项"
            // trigger={ item.pagepermission === undefined :''?'click'}
            trigger="click"
            >
            <Button 
              type="primary"
              shape="circle"
              ghost
              icon = {<EditOutlined />}
              disabled = {item.pagepermission === undefined}
              // onClick = { () => editMethod(item)}
            />
          </Popover>
          <Button 
            type="dashed"
            shape="circle"
            danger icon = {<DeleteOutlined />}
            onClick = { () => confirmDelMethod(item)}
          />
        </div>)
      }
    }
  ];

  const switchMethod = (item) => {
    item.pagepermission = item.pagepermission === 1 ?0:1
    // 更新状态
    setDataSource([...dataSource])
    // 同步后端
    if(item.grade === 1) {
      axios.patch(`http://localhost:9000/rights/${item.id}`, {
        pagepermission: item.pagepermission
      })
    } else {
      axios.patch(`http://localhost:9000/children/${item.id}`, {
        pagepermission: item.pagepermission
      })
    }
  }

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
    if (item.grade === 1) {
      setDataSource(dataSource.filter(data => data.id !== item.id))
      axios.delete(`http://localhost:9000/rights/${item.id}`)
    } else {
      let list = dataSource.filter(data => data.id === item.rightId)
      list[0].children = list[0].children.filter(data => data.id !== item.id)
      // 更新状态
      setDataSource([...dataSource])
      axios.delete(`http://localhost:9000/children/${item.id}`)
    }

  }

  return (
    <Table dataSource={dataSource} columns={columns} pagination={{pageSize:5}} />
  );
}
