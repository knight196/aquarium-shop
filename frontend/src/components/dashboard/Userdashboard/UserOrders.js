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

       <Link to={`/orders/get/_id/${order.orderId}`}>

       <div className="d-flex align-items-center justify-content-between user-orders-card px-2">
       
       <div>
       <img style={{width:'200px', height:'200px'}} src={ item.image.url} alt={item.title}/>
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

//testing for list orders
 
// <>
// {orders.map((order)=> (
//             <div className="d-flex px-2 my-2 py-2 justify-content-between bg-secondary bg-opacity-50">
        
//         <div className="w-100">
//           <h5>Product Detail</h5>
//         {order.products.map((item) => (

//           <div className="d-flex user-orders m-2 p-2 align-items-center justify-content-between">
          
//           <div>
//           <img style={{width:'200px', height:'200px'}} src={ item.image} alt={item.title}/>
//           </div>
          
//           <div>
//           <p>Name: {item.title}</p>
//           <p>Price: £{item.price}</p>
//           <p>Color: {item.color}</p>
//           <p>Storage: {item.storage}</p>
//           </div>
          
//           </div>
          
//           ))}

//           </div>

//  <div className="user-order-option">
// <button onClick={()=> setShowOption(order._id)}><i className="bi bi-list"></i></button>
 

// <div className={showOption === order._id ? 'd-block' : 'd-none'}>
// <button className="border-0 px-2 m-1 bg-danger" onClick={()=> deletelist(order._id)}>Delete</button>
// <br></br>
// <button className={cancelOrder === order._id === order.Cancel === true ? 'd-block px-2 bg-warning border-0 m-1' : "d-none" } onClick={()=> {cancel(order._id);setcancelOrder(order._id,!cancelOrder)}}>Cancel</button>
// </div>
  

// </div>

//           </div>

//           ))}
// </> 


///testing for more than orders from specific id from user sides
  
  //   <>
  //   {orders.map((order)=> (order.products === order._id)?
  //   (
  //     <>
  // {order.products.map((item,index) => (
  //   <div className="d-flex bg-secondary bg-opacity-50 my-2 user-orders justify-content-between">
    
  //   <div className="d-flex align-items-center">
  //   <img style={{width:'200px', height:'200px'}} src={item.image} alt={item.title}/>
  //   <div>
  //   <p>Title: {item.title}</p>
  //   <p>£{item.price}</p>
  //   <p>Color: {item.color}</p>
  //   <p>Storage: {item.storage}</p>
  //   </div>
    
  //   </div>
    
  //   <div className="user-order-option">
  //   <button onClick={()=> setShowOption(order._id)}><i className="bi bi-list"></i></button>
   
  
  //   <div className={showOption === order._id ? 'd-block' : 'd-none'}>
  //   <button className="border-0 px-2 m-1 bg-danger" onClick={()=> deletelist(order._id)}>Delete</button>
  //   <br></br>
  //     <button className={cancelOrder === order._id === order.Cancel === true ? 'd-block px-2 bg-warning border-0 m-1' : "d-none" } onClick={()=> {cancel(order._id);setcancelOrder(order._id,!cancelOrder)}}>Cancel</button>
  // </div>
    
  
  //   </div>
  
  //     <p className={cancelOrder === order._id === order.Cancel === true ? 'order-cancelled': 'order-cancelled show'}>{order.Refund === true ? 'Refunded' : 'orderCancelled'}</p>
  
  
  //  </div>
  // ))}
  //   </>
  //   ):(
  //     <>
  //   {order.products.slice(-1).map((item,index) => (
  //   <div className="d-flex bg-secondary bg-opacity-50 my-2 user-orders justify-content-between">
    
  //   <div className="d-flex align-items-center">
  //   <img style={{width:'200px', height:'200px'}} src={item.image} alt={item.title}/>
  //   <div>
  //   <p>Title: {item.title}</p>
  //   <p>£{item.price}</p>
  //   <p>Color: {item.color}</p>
  //   <p>Storage: {item.storage}</p>
  //   </div>
    
  //   </div>
    
  //   <div className="user-order-option">
  //   <button onClick={()=> setShowOption(order._id)}><i className="bi bi-list"></i></button>
   
  
  //   <div className={showOption === order._id ? 'd-block' : 'd-none'}>
  //   <button className="border-0 px-2 m-1 bg-danger" onClick={()=> deletelist(order._id)}>Delete</button>
  //   <br></br>
  //     <button className={cancelOrder === order._id === order.Cancel === true ? 'd-block px-2 bg-warning border-0 m-1' : "d-none" } onClick={()=> {cancel(order._id);setcancelOrder(order._id,!cancelOrder)}}>Cancel</button>
  // </div>
    
  
  //   </div>
  
  //     <p className={cancelOrder === order._id === order.Cancel === true ? 'order-cancelled': 'order-cancelled show'}>{order.Refund === true ? 'Refunded' : 'orderCancelled'}</p>
  
  
  //  </div>
  // ))}
  //     </>
  //   ))}
  //   </>