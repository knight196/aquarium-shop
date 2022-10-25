import {useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {useStateValue} from '../../StateProvider'
import {isAuthenticated, logout} from '../../helpers/auth'
import  {toast} from 'react-toastify'
import './Header.css'
import Submenulist from './Submenulist'
import data from './submenu'

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

  
  const [list,setlist] = useState(data);
    
      // menubar for navbar
const [click, setClick] = useState(false);
const handleClick = () => setClick(!click);


  return (
    <nav className="bg-dark">

    <div className="d-flex justify-content-between align-items-center px-2 py-1">
    <h3 className="logo"><NavLink to="/">AquaticNature</NavLink></h3>


    <div className="mobile-cart">
    <div className="my-auto text-center text-dark">
    {!isAuthenticated() ? (
            <NavLink to="/Login">
            
            <h5>Sign In</h5>
            </NavLink>
):
           (
            <div className="d-flex text-white flex-column">
            <small>{user.username}</small>
           <button className="btn text-white" onClick={signOut}>Sign Out</button>
            </div> 
           )        
}
    </div>

    <button>
        <NavLink to='/Checkout'><i className="fas fa-shopping-cart"></i>
        <span>{basket?.length}</span>
    </NavLink>
    </button>
    <button onClick={handleClick} className="menu-bar text-white"><i className={click ? "fas fa-times" : "fas fa-bars"}></i></button>
    </div>
    </div>
    
    <div className={click ? "navlist show" : "navlist"}>
    
            <div className="navoption">
            <div className="desktop-cart">
            <div className="my-auto text-center">
            {!isAuthenticated() ? (
            <NavLink to="/Login">
           
            <h5>Sign In</h5>
            </NavLink>
):
           ( 
            <div className="d-flex flex-column">
            <small className="text-white">{user?.username}</small>
           <small className="text-white" onClick={signOut}>Sign Out</small>
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

    {
      list.map((question) => {
        return <Submenulist key={question.id} {...question} />
      })
    }



            
            
      <div className="accordion px-2">
      {isAuthenticated() && isAuthenticated().role === 0 && (
        <p>
       <NavLink to="/user/dashboard">Dashboard</NavLink>
    </p>
  )}
  {isAuthenticated() && isAuthenticated().role === 1 && (
    <p>
       <NavLink to="/admin/dashboard">Dashboard</NavLink>
    
       </p>
  )}
  </div>

<div className="px-2">
<p><NavLink style={{textDecoration:'none'}}  to="/Contact">Contact</NavLink></p>
</div>
            


            </div>
    
    
    </div>
            </nav>
  )
}
