import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default function AdminOrders() {


    const [orders,setOrders] = useState([])
const getOrders = async () => {
  const res = await axios.get('/api/orders');
  setOrders(res.data.orders)
}


useEffect(() => {
    getOrders();
},[])


  return (
    <div>
      {orders.map((order)=> (
            <div className="d-flex my-2 py-2 justify-content-between bg-secondary bg-opacity-50 customer-details" style={{position:'relative'}}>
        
        <div>
          <h5>Product Detail</h5>
        {order.products.slice(0,1).map((item) => (

          <Link to={`/api/orders/_id/${order._id}`}>

          <div className="d-flex align-items-center justify-content-between user-orders-card px-2">
          
          <div>
          <img style={{width:'200px', height:'200px'}} src={ item.image} alt={item.title}/>
          </div>
          
          <div className="user-orders-card-info">
          <p>Name: {item.title}</p>
          <p>Price: £{item.price}</p>
          <p>Color: {item.color}</p>
          <p>Storage: {item.storage}</p>
          </div>

          <div className="user-orders-card-info-date">
            <small>Username: {order?.username}</small>
            <br></br>
      <small>Placed Date</small>
      <br></br>
    <small>{order?.createdAt.slice(0,10)}</small>
    </div>
    
          
          </div>
  
          <div className={order.Cancel === true ? 'd-none' : 'd-block'}>
          <p className={order.Delivered === false ? 'delivered': 'delivered show'}>{order.Refund === false ? 'DELIVERED' : 'REFUNDED'}</p>
          </div>
  

          <p className={order.Cancel  === false ? 'order-cancelled': 'order-cancelled show'}>ORDERCANCELLED</p>
          
          
          </Link>
          ))}

          </div>
          
            </div>
            
          ))}
    </div>
  )
}
