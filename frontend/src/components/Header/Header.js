import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {useStateValue} from '../../StateProvider'
import {isAuthenticated, logout} from '../../helpers/auth'
import  {toast} from 'react-toastify'
import './Header.css'
export default function Header(props) {

  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const signOut = () => {
    logout(() => {

      dispatch({
        type: "SET_USER",
        user: null,
      });
      navigate("/");
      toast.success('you have logout successfully')
    })
  };
    
      // menubar for navbar
const [click, setClick] = React.useState(false);
const handleClick = () => setClick(!click);


  return (
    <nav>

    <div className="d-flex justify-content-between align-items-center px-2 py-1">
    <h3 className="logo"><NavLink to="/">Phones4Life</NavLink></h3>


    <div className="mobile-cart">
    <div className="my-auto text-center">
    {!isAuthenticated() ? (
            <NavLink className="text-dark" to="/Login">
            
            <h5>Sign In</h5>
            </NavLink>
):
           (
            <div className="d-flex flex-column">
            <small>{user.username}</small>
           <button className="btn" onClick={signOut}>Sign Out</button>
            </div> 
           )        
}
    </div>

    <button>
        <NavLink to='/Checkout'><i className="fas fa-shopping-cart"></i>
        <span>{basket?.length}</span>
    </NavLink>
    </button>
    <button onClick={handleClick} className="menu-bar"><i className={click ? "fas fa-times" : "fas fa-bars"}></i></button>
    </div>
    </div>
    
    <div className={click ? "navlist show" : "navlist"}>
    
            <ul>
            <div className="desktop-cart">
            <div className="my-auto text-center">
            {!isAuthenticated() ? (
            <NavLink className="text-dark" to="/Login">
           
            <h5>Sign In</h5>
            </NavLink>
):
           ( 
            <div className="d-flex flex-column">
            <small>{user?.username}</small>
           <small onClick={signOut}>Sign Out</small>
            </div> 
           )        
}
    </div>
    </div>
            <button className="desktop-cart">
        <NavLink  to='/Checkout'><i className="fas fa-shopping-cart"></i>
        <span>{basket?.length}</span>
    </NavLink>
    </button>
              <li><NavLink style={{textDecoration:'none'}}  to="/Product">Product</NavLink></li>
            
            
      
      {isAuthenticated() && isAuthenticated().role === 0 && (
        <li>
       <NavLink to="/user/dashboard">Dashboard</NavLink>
    </li>
  )}
  {isAuthenticated() && isAuthenticated().role === 1 && (
    <li>
       <NavLink to="/admin/dashboard">Dashboard</NavLink>
    
       </li>
  )}

<li><NavLink style={{textDecoration:'none'}}  to="/Contact">Contact</NavLink></li>
            


            </ul>
    
    
    </div>
            </nav>
  )
}
