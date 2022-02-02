import './settings.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { useContext } from 'react'
import { Context } from '../../context/Context'
import { useState } from 'react'
import axios from 'axios'

const url="http://localhost:5000/api";

export default function Settings() {
  const PF="http://localhost:5000/images/";
   const {user, dispatch}= useContext(Context);
  const [file, setFile] = useState(null);
  const[username, setUsername]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[success,setSuccess]=useState(false);

  const Handle=async(id)=>{
        try {
          await axios.delete(`${url}/users/${id}`,{
            data:{userId:id}
          });
        } catch (error) {
          
        }
  }

  const handleDelete=()=>{
    const id=user._id;
    dispatch({type:"LOGOUT"});
     Handle(id);

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"});
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      console.log(data);
      try {
        
        await axios.post(`${url}/upload`, data);
        
      } catch (err) {
        console.log(err);
      }
    }
    try {
     const res= await axios.put(`${url}/users/${user._id}`, updatedUser);
     setSuccess(true);
    dispatch({type:"UPDATE_SUCCESS", payload: res.data});

    } catch (err) {
      dispatch({type:"UPDATE_FAILURE"})
    }
  };
  

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete" onClick={handleDelete}>Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF+user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e)=>setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username} onChange={(e)=>setUsername(e.target.value)} name="name" />
          <label>Email</label>
          <input type="email" placeholder={user.email} onChange={(e)=>setEmail(e.target.value)} name="email" />
          <label>Password</label>
          <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} name="password" />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {success && <span style={{color: "green" , textAlign:"center", marginTop:"20px"}}>Profile has been Updated</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  )
}
