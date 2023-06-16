import React,{useState,useEffect} from 'react'
import '../dashboard.css'
import axios from 'axios'
import {useStateValue} from '../../../StateProvider'
import {Link} from 'react-router-dom'

export default function UserOrders() {

    const [{user}, dispatch] = useStateValue();
    
const [orders,setOrders] = useState([]);



  const getorders = async () => {
    const res = await axios.post('/orders/get', {email:user.email})
    setOrders(res.data)
  }
  useEffect(() => {
  getorders();
},[])


  return (
    <div>
    {user === null && (window.location.href="/Login")}

{user !== null && (
   <div>
   {orders.map((order)=> (
         <div className="d-flex my-2 py-2 justify-content-between bg-secondary bg-opacity-50 customer-details" style={{position:'relative'}}>
     
     <div>
       <h5>Product Detail</h5>
     
     {order.products.slice(0,1).map((item) => (

       <Link to={`/ordersInfo/${order.orderId}`}>

       <div className="d-flex align-items-center justify-content-between user-orders-card px-2">
       
       <div>
       <img style={{width:'200px', height:'200px'}} src={!item.image.url ? item.image : item.image.url} alt={item.title}/>
       </div>
       
       <div className="user-orders-card-info">
       <p>Name: {item.title}</p>
       <p>Price: £{item.price}</p>
       </div>

       <div className="user-orders-card-info-date">
         <small>Username: {order?.username}</small>
         <br></br>
   <small>Placed Date</small>
   <br></br>
 <small>{order?.createdAt.slice(0,10)}</small>
 </div>
 
       
       </div>


       <div className={order.Cancel === true || order.Refund === true  ? 'd-none' : 'd-block'}>
       <p className={order.Delivered === false ? 'delivered': 'delivered show'}>{order.Return === false ? 'DELIVERED' : 'RETURNED'}</p>
       </div>

       {order.Refund === true ? 
       
      
      (
        <p className={order.Refund  === false ? 'refunded': 'refunded show'}>REFUNDED</p>
        )
        :
        (
          
          <p className={order.Cancel  === false ? 'order-cancelled': 'order-cancelled show'}>ORDERCANCELLED</p>
      )
    
    }      

       
       
       </Link>
       ))}

       </div>
       
         </div>
         
       ))}
 </div>
  )}
  </div>
  )
}
