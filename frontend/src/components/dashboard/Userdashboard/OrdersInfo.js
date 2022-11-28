import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import {useStateValue} from '../../../StateProvider'

export default function OrdersInfo() {

      
    const [{user}, dispatch] = useStateValue();

  const { id }=useParams();
  const [orders, setorders]=useState([])


  const fetchData = async () => {
      const res = await axios.get(`/orders/get/_id/${id}`)
      setorders(res.data)
  }

      useEffect(()=> {
      fetchData(orders.orders);
      },[orders.orders])

      const [cancelOrder, setcancelOrder] = useState(orders)

      const deletelist = async (id) => {
        await axios.delete(`/orders/get/${id}`)
        toast.success('Your product has been deleted successfully')
        setTimeout(function (){
         window.location.href="/user/dashboard"
        },1500)
       }
      
      

      const cancel = async () => {
        await axios.post('/orders/adminmessage', {
          order_id:orders?._id,
          username:user?.username,
          message:'wants to cancel order'
        })
        await axios.post('/orders/addusermessage', {
          order_id:orders?._id,
          username:user?.username,
          message:'Your order cancellation request has been received'
        })
        toast.success('Your order cancellation has been received');
        setTimeout(function(){
        window.location.href="/user/dashboard"
        },1500)
        }

        const [returnitem,setreturnitem] = useState(orders)

        const returned = async (id) => {
          await axios.put(`/orders/ordersreturn/${id}`)
          await axios.post('/orders/addusermessage', {
            order_id:orders?._id,
            username:user?.username,
            message: 'You have returned your item'
          })
          await axios.post('/orders/adminmessage', {
            order_id:orders?._id,
            username:user?.username,
            message:'has opened the return request'
          })
          toast.success('You have opened the return request')
          setTimeout(function(){
            window.location.href="/user/dashboard"
          },[1500])
        }


  return (
    <div>

<div className="d-flex order-details">

<div className="bg-white bg-opacity-50 orders-info p-2">

<h1>Order Details</h1>
<hr></hr>
<div className="d-flex justify-content-between orders-date">
  
  <div>
    <h5>Placed Order</h5>
    <p>Date: {orders.createdAt?.slice(0,10)}</p>
  </div>

  <div className="text-center">
    <h5>Time</h5>
    <p>{orders.createdAt?.slice(11,16)}</p>
  </div>

  <div>
    <h5>Order Id</h5>
    <p>{orders._id}</p>
  </div>

</div>

<hr></hr>

        {orders.products?.map((item)=> (
          <div style={{border:'1px solid darkgray'}} className="d-flex my-1 px-2 align-items-center justify-content-between orders-list">

          <div className="py-2">
            <img src={item.image.url} alt=""/>
          </div>

            <div className="w-50 px-2 text-center">
            <p5>Title</p5>
            <br></br>
            <p2>{item.title}</p2>
            </div>

            <div className="w-50 text-center">
              <p5>Price</p5>
              <p>£{item.price}</p>
            </div>

            {!item.color ? (
            <>
            </>
          ): (
            <div className="w-50 text-center">
              <p5>Color</p5>
              <br></br>
              <p5>{item.color}</p5>
            </div>
          )
          }


          {!item.packaging ? (
            <>
            </>
          ): (
            <div className="w-50 text-center">
              <p5>Packaging</p5>
              <br></br>
              <p5>{item.packaging}</p5>
            </div>
          )
          }


          </div>
     ))}

<div className={orders.Cancel === true || orders.Refund === true  ? 'd-none' : 'd-block'}>
       <p className={orders.Delivered === false ? 'delivered': 'delivered show'}>{orders.Return === false ? 'DELIVERED' : 'RETURNED'}</p>
       </div>

       {orders.Refund === true ? 
       
      
      (
        <p className={orders.Refund  === false ? 'refunded': 'refunded show'}>REFUNDED</p>
        )
        :
        (
          
          <p className={orders.Cancel  === false ? 'order-cancelled': 'order-cancelled show'}>ORDERCANCELLED</p>
      )
    
    }      
     
{/* <p className={cancelOrder=== orders._id === orders.Cancel === true ? 'order-cancelled': 'order-cancelled show'}>{orders.Refund === true ? 'REFUNDED' : 'ORDERCANCELLED'}</p>
   */}
     
     </div>

<div className="bg-white bg-opacity-50 px-2 py-2 orders-address">
    
    <div>

  <h5>Customer's Address</h5>
  <hr></hr>
     <p>Username: {orders?.username}</p>
     <p>StreetName: {orders.address?.street}</p>
     <p>City: {orders.address?.city}</p>
     <p>PostCode: {orders.address?.postcode}</p>
     <p>Contact No: {orders.address?.phone}</p>
    </div>

    <hr></hr>

<div className="d-flex justify-content-between align-items-center">
  <h5>TotalPrice</h5>
  <p>£{orders.amount}</p>
</div>

<hr></hr>


    <div>
      <h5>Actions</h5>
      <div className="d-flex justify-content-between">
      <button className="border-0 px-2 m-1 bg-danger btn" onClick={()=> deletelist(orders._id)}>Delete</button>
      <div className={orders.Delivered === true ? 'd-none' : 'd-block'}>
      <button className={cancelOrder === orders._id === orders.Cancel === true ? 'd-block btn px-2 bg-warning border-0 m-1' : "d-none" } onClick={()=> {cancel(orders._id);setcancelOrder(orders._id,!cancelOrder)}}>Cancel</button>
      </div>
      
      <div className={orders.Delivered === true ? 'd-block' : 'd-none'}>
      <button className={returnitem === orders._id === orders.Return === true ? 'd-block btn px-2 bg-secondary border-0' : 'd-none'} onClick={()=> {returned(orders._id); setreturnitem(orders._id, !returnitem)}}>Return</button>
      </div>

      </div>



    </div>


</div>
        
     </div>
    </div>
  )
}
