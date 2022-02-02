import axios from 'axios';
import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context';
import './login.css'

const url="http://localhost:5000/api";
export default function Login() {
  const userRef=useRef();
  const passwordRef=useRef();
  const{dispatch,isFetching}=useContext(Context);

  const handleSubmit=async (e)=>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try {
      const res=await axios.post(`${url}/auth/login`,{
        username:userRef.current.value,
        password:passwordRef.current.value,
      })
    dispatch({type:"LOGIN_SUCCESS",payload:res.data});

    } catch (error) {
    dispatch({type:"LOGIN_FAILURE"});
      
    }

  }
  
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="loginInput" 
        type="text" 
        ref={userRef}
        placeholder="Enter your Username..." />
        <label>Password</label>
        <input className="loginInput" 
        type="password" 
        ref={passwordRef}
        placeholder="Enter your password..." />
        <button className="loginButton" type='submit' disabled={isFetching}>Login</button>
      </form>
        <button className="loginRegisterButton">
          <Link className='link' to='/register'>Register</Link>
        </button>
    </div>
  )
}
