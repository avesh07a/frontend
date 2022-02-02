import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { Context } from '../../context/Context';
import './singlePost.css'

export default function SinglePost() {
  const {user}=useContext(Context);
  const url="http://localhost:5000/api";
  const location=useLocation();
  const path=location.pathname.split("/")[2];
  const [post,setPost]=useState({});
  const[title,setTitle]=useState("");
  const[desc,setDesc]=useState("");
  const[updateMode,setUpdateMode]=useState(false);
  useEffect(()=>{
    const getPost=async()=>{
      const res=await axios.get(`${url}/posts/`+path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  },[path])

  const handleDelete=async()=>{
    try {
      await axios.delete(`${url}/posts/${post._id}`,{
        data:{username:user.username}
      });
      window.location.replace("/");

    } catch (error) {
      
    }
  }

const handleUpdate=async()=>{
  try {
    await axios.put(`${url}/posts/${post._id}`,{
      username:user.username, title, desc
    });
   setUpdateMode(false);

  } catch (error) {
    
  }
}
  const PF = "http://localhost:5000/images/";
  return (
    <div className='singlePost'>
      <div className="singlePostWrapper">
        {post.photo && <img
          className="singlePostImg"
          src={PF +post.photo}
          alt=""
        /> }

        {
          updateMode ? (
            <input type="text" 
            value={title} 
            className='singlePostTitleInput'
            autoFocus
            onChange={(e)=>setTitle(e.target.value)}

            />
          ):(
             <h1 className="singlePostTitle">
            {title}
            {
              post.username===user?.username && (
                <div className="singlePostEdit">
                <i className="singlePostIcon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                </div>
              )
            }
            
        </h1>
          )
        }
        
       
        <div className="singlePostInfo">
            <span className='singlePostAuthor'>Author:<Link className='link' to={`/?user=${post.username}`}><b>{post.username}</b></Link> </span>
            <span className='singlePostAuthor'>{new Date(post.createdAt).toDateString()}</span>
             
        </div>
        {
          updateMode ? (
            <textarea 
            value={desc} 
            className='singlePostDescInput'
            autoFocus
            onChange={(e)=>setDesc(e.target.value)}
            />
          ):(
            <p className='singlePostDesc'>
            {desc}

        </p>
          )
        }
        {
          updateMode && (
            <button className="singlePostButton" onClick={handleUpdate}>Update</button>
          )
        }
        
      </div>
    </div>
  )
}
