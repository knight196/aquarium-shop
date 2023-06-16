import {useState,useEffect} from 'react'
import { toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js'
import { CardElement, useElements,useStripe,CardCvcElement,CardExpiryElement,CardNumberElement} from '@stripe/react-stripe-js'
import axios from 'axios'
import {useParams,useNavigate} from 'react-router-dom'

import '../dashboard.css'

export default function FailedPayment() {

    const { id }=useParams();

    const navigate = useNavigate()

    const [orders, setorders]=useState([])
  
  
  
    const fetchData = async () => {
        const res = await axios.get(`/orders/ordersInfo/${id}`)
        setorders(res.data)
    }
  
        useEffect(()=> {
        fetchData(orders.orders);
        },[orders.orders])


     
  const [clientSecret, setClientSecret] = useState(true);
  const [processing,setprocessing] = useState('')
  const [error,seterror] = useState(null)
  const [disabled,setdisabled] = useState(true)
  const [succeeded,setsucceeded] = useState(false)

  const elements = useElements();
  const stripe = useStripe();

  useEffect(() => {
    const fetchClientSecret = async () => {
      const data = await axios.post('/create-card-payment', {
        amount: orders.amount
      })
      setClientSecret(data.data.clientSecret)
    }
    fetchClientSecret()
    console.log('client secret is ', clientSecret)
  }, [orders])


const handleChange = (e) => {

  setdisabled(e.empty)
  seterror(e.error ? e.error.message: '')

}
  
  const handlePayment = async (e) => {
    e.preventDefault();

    setprocessing(true)

    await stripe.confirmCardPayment(clientSecret,{

      payment_method: {
        card:elements.getElement(CardNumberElement), 
        billing_details:{
          address:{
            line1:orders.address?.street,
            postal_code:orders.address?.postcode,
            city:orders.address?.city,
          },
          email:orders?.email,
          phone:orders.address?.phone
        },
      }
     })
     .then(() => {
      seterror(null)
      setprocessing(false)
      setsucceeded(true)
     })
          
          
     const paymentCreate = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
      billing_details:{
        address:{
          line1:orders.address?.street,
          postal_code:orders.address?.postcode,
          city:orders.address?.city,
        },
        email:orders?.email,
        phone:orders.address?.phone
      },
     })
     

     
     
     const {paymentIntent} = await stripe.retrievePaymentIntent(clientSecret);
     if (paymentIntent && paymentIntent.status === 'succeeded') {
       // Handle successful payment here
         

         axios.put('/orders/repaymentsuccessful', {
          orderId:orders.orderId,
          paymentCreate:paymentCreate.paymentMethod,
          paymentConfirm:paymentIntent.status
      })

      await axios.post('/emailproduct/successrepayment', {
        result:orders,
        email:orders.email,
        subtotal:orders.subtotal,
        totalAmount:orders.amount,
        orderId:orders.orderId,
        address:orders.address,
        paymentCreate:paymentCreate.paymentMethod,
        deliveryOptions:orders.deliveryOptions,
        deliveryPrice:orders.deliveryPrice,
        deliveryDate:orders.deliveryDate,
      })
      navigate('/')
      toast.success('Payment successful')

      
       } else {
         // Handle unsuccessful, processing, or canceled payments and API errors here
         navigate('/')
         toast.error('Payment declined')
       }


}

  const inputStyle = {
    showIcon: true,
      iconStyle: "solid",
    };

  return (
    <div>

    <div className="d-flex order-details">
    
    <div className="bg-white bg-opacity-50 orders-info p-2">
    
    <h1>Order Details</h1>
    <hr></hr>
    
    
    <div className="d-flex align-items-center">
    
    <div className="text-center">
    
    {orders.paymentConfirm === 'succeeded' ? 
    (
    <>
    <p>Paid Not Sent</p>
    
    <i className="bi bi-check bg-white text-success p-1"></i>
    </>
    ) 
    : (
    <>
    <p>Payment Pending</p>
    <span className="bg-white text-secondary p-1">X</span>
    </>
    )}
    
    </div>
    
    <div style={{width:'50%',height:'3px'}} className={orders.Dispatch === false ? 'bg-secondary' : 'bg-success'}></div>
    
    <div className="text-center">
    
    <p>Dispatched</p>
    
    {orders.Dispatch === false ?
    <span className="bg-white text-secondary p-1">X</span>
    : <i className="bi bi-check bg-white text-success p-1"></i>
    }
    
    </div>
    
    <div style={{width:'50%',height:'3px'}} className={orders.Delivered === false ? 'bg-secondary' : 'bg-success'}></div>
    
    
    <div className="text-center">
    
    <p>Delivered</p>
    {orders.Delivered === false ?
      <span className="bg-white text-secondary p-1">X</span>
    : <i className="bi bi-check bg-white text-success p-1"></i>
    }
    
    </div>
    
    
    
    </div>
    
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
        <p>{orders.orderId}</p>
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
    
                <div className="w-50 text-center">
                  <p5>Qty</p5>
                  <p>{item.quantity}</p>
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
      <h5>Subtotal</h5>
      <p>£{orders.subtotal}</p>
    </div>
    
    <hr></hr>
    
    <div>
    
    <h5>Estimated Date</h5>
    <p><i className="bi bi-truck"></i> {orders.deliveryDate}</p>
    </div>
    
    <hr></hr>
    
        <div>
      <h5>Delivery Options</h5>
    
      <div className="d-flex justify-content-between align-items-center">
    
      <p>{orders.deliveryOptions}</p>
      <p>£{orders.deliveryPrice}</p>
      
      </div>
    </div>
    
    <hr></hr>
    
    
    <div className="d-flex justify-content-between align-items-center">
      <h5>TotalPrice</h5>
      <p>£{orders.amount}</p>
    </div>
    
    <div>
    {orders.paymentCreate?.map((item) => (
      <>
      <hr></hr>
      <small style={{fontWeight:'bold'}}>Payment Info</small>
      <div className="d-flex justify-content-between align-items-center">
      <small>Card: <i className={`h6 fa-brands fa-cc-${item.card.brand}`}></i></small>
      <small>Ending in: {item.card.last4}</small>
      </div>
      </>
    ))}
    </div>
    
    <hr></hr>

    <form onSubmit={handlePayment}>


<div className="bg-white bg-opacity-50 p-2">


<small>Card Number</small>
<CardNumberElement className="bg-white rounded-1 p-2" options={inputStyle} onChange={handleChange}/>

<div className="d-flex justify-content-between">
  <div className="w-50">

  <small>Expiry</small>
  <div>
            <CardExpiryElement className="bg-white p-2 h-50 rounded-1"/> 
  </div>
  </div>
    
            <div style={{marginLeft:'10px'}} className="w-50">
            <small>CVC</small>
            <div className="cvc">
            <CardCvcElement className="bg-white p-2 rounded-1" />
            <img style={{width:'40px', height:'40px'}} src="https://cdn2.iconfinder.com/data/icons/credit-cards-6/156/security_code_back-512.png" alt="cvc"/>
            </div>
            </div>
</div>
       

</div>

   <div className="text-center ">
              {error && <p>{error}</p>}
            <button disabled={processing || disabled || succeeded} className="bg-warning px-2 py-1 m-2 rounded-0 border-0">
              <span>{processing ? <span className="spinner-border text-primary spinner-border-sm"></span> : 'Confirm Payment'}</span>
              </button>
            </div>

          </form>
    
    </div>
            
         </div>
        </div>
  )
}
