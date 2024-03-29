import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useQuery} from '@apollo/client'
import {allOrders} from '../../GraphQLData/Orders'

export default function AdminOrders() {


  const {data} = useQuery(allOrders)


    const [orders,setOrders] = useState([])



useEffect(() => {
    if(data){
      setOrders(data.orders)
    }
},[data])


  return (
    <div>
      {orders.map((order)=> (
            <div className="d-flex my-2 py-2 justify-content-between bg-secondary bg-opacity-50 customer-details" style={{position:'relative'}}>
        
        <div>
          <h5>Product Detail</h5>
        {order.products.slice(0,1).map((item) => (

          <Link to={`/api/orders/_id/${order.orderId}`}>

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
    <small>{order?.date.slice(0,10)}</small>
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
