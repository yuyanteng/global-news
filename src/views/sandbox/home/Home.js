import { Button } from 'antd';
// import axios from 'axios';
import React from 'react';

export default function Home() {
  const ajax = () => {

    /* //取数据  get
    axios.get("http://localhost:8000/post/2").then(res => {
      console.log(res.data)
    })
    //增加数据  post
    axios.post("http://localhost:8000/posts",{
      title: '33333',
    })

    //全改数据  put
    axios.put("http://localhost:8000/posts",{
      title: '111-修改',
    })
    //局部改数据  patch
    axios.patch("http://localhost:8000/posts",{
      title: '111-修改-11111',
    })
    // 删除数据  delete
    axios.delete("http://localhost:8000/posts/1")


    //下链接数据  _embed
    axios.get("http://localhost:8000/comments?_embed=comments").then(res => {
      console.log(res.data)
    })

    //上链接数据  _expand
    axios.get("http://localhost:8000/comments?_expand=posts").then(res => {
      console.log(res.data)
    }) */
  } 
  return <div>
    <Button onClick={ajax}></Button>
  </div>;
}
