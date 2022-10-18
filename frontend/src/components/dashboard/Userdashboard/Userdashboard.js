import React,{useState,useEffect} from 'react'
import '../dashboard.css'
import {useStateValue} from '../../../StateProvider'
import {logout} from '../../../helpers/auth'
import { useNavigate,Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import Userorders from './UserOrders'
import Messagetab from './Messagetab'

export default function Userdashboard() {

  const navigate = useNavigate();
  
  const [{user}, dispatch] = useStateValue();

  const [toggleState,setToggleState] = useState(1)
  
const toggleTab = (index) => {
  setToggleState(index)
}

const signOut = () => {
  logout(() => {

    dispatch({
      type: "SET_USER",
      user: null,
    });
    navigate("/");
    toast.success('You have logged out successfully')
  })
};



  return (
    <div className="container-fluid">

    <div className="tabs-block">
      <div className={toggleState ===1 ? "active-tabs" : "tabs"} onClick={() => toggleTab(1)}>Profile</div>
      <div className={toggleState ===2 ? "active-tabs" : "tabs"} onClick={() => toggleTab(2)}>Orders</div>
      <div className={toggleState ===3 ? "active-tabs" : "tabs"} onClick={() => toggleTab(3)}>Message</div>
    </div>

    <div className="content-tabs">

<div className={toggleState === 1 ? "content active-content" : "content"}>
  <div className="mt-5">
  <h5>Profile</h5>
    <span style={{fontSize:'150px'}}><i className="fa-solid fa-user"></i></span>
    <div>
      <p>Username: <span>{user.username}</span></p>      
    </div>
    <button className="border-0 py-1 btn px-2 bg-primary text-white" onClick={signOut}>Sign Out</button>
  </div>
  </div>

<div className={toggleState === 2 ? "content active-content" : "content"}>

<Userorders/>

    </div>

<div className={toggleState === 3 ? "content active-content" : "content"}>

<Messagetab/>

    </div>

    </div>

    </div>
  )
}

