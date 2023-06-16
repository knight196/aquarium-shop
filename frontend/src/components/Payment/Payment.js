import { useEffect, useState, useRef,useMemo } from 'react';
import './Payment.css';
import { useStateValue } from "../../StateProvider";
import { Link, useNavigate,useSearchParams } from "react-router-dom";
import { getBasketTotal, getTotalBasketQty, qty } from '../../reducer'
import { ToastContainer, toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutSteps from '../CheckoutSteps';
import Basket from '../Checkout/Basket'
import ConfirmLoader from './Confirmloader'

import { CardElement, useElements,useStripe,CardCvcElement,CardExpiryElement,CardNumberElement} from '@stripe/react-stripe-js'
import axios from 'axios'


function Payment() {


  const [{ address, basket, user,deliveryOptions }, dispatch] = useStateValue();
  const [clientSecret, setClientSecret] = useState("");
  const [cardSecret, setCardSecret] = useState("");
  const [processing,setprocessing] = useState('')
  const [error,seterror] = useState(null)
  const [disabled,setdisabled] = useState(true)
  const [succeeded,setsucceeded] = useState(false)


  const [params] = useSearchParams()

  const arr = Object.fromEntries(params) 


  const renderAfterCalled = useRef(false)


  useEffect(() => {
    if(!renderAfterCalled.current){
      if(arr.redirect_status === 'succeeded'){
        renderAfterCalled.current = true
        toast.success('Your payment was successful')
        setTimeout(function (){
          window.localStorage.removeItem('cartItems')
          window.location.href="/"
        },1500)
      }
    }
      
  },[])


  const orderId = crypto.randomUUID().slice(0,20)


  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('address', JSON.stringify(address))
  },[address])

  const elements = useElements();
  const stripe = useStripe();

  const totalPrice = (getTotalBasketQty(basket) + parseFloat(deliveryOptions.price)).toFixed(2)
  

  var today = new Date()

var dd = String(today.getDate()).padStart(2,'0')

var mm = String(today.getMonth() + 1).padStart(2,'0')

var yyyy = today.getFullYear()

var fullDate = dd + '.' + mm + '.' + yyyy

var someDate = new Date()



      //delivery Options

    var numberOfDaysToAdd = deliveryOptions.options === 'Standard' ? 3 : 1
    
  someDate.setDate(someDate.getDate() + numberOfDaysToAdd)

  var DD = String(someDate.getDate()).padStart(2,'0')

  var MM = String(someDate.getMonth() + 1).padStart(2,'0')

  var y = someDate.getFullYear()
  
  var someFormattedDate = DD + '.' + MM + '.' + y
  
  today = fullDate + ' - ' + someFormattedDate

 

  useEffect(() => {
    const fetchClientSecret = async () => {
      const data = await axios.post('/webhook/create-payment', {
        basket,
        orderId,
        subtotal:getBasketTotal(basket),
      email: user?.email,
      username: user?.username,
      address: address,
      deliveryOptions:deliveryOptions.options,
      deliveryPrice:deliveryOptions.price,
     deliveryDate: today,
        amount: totalPrice,
      })
      setClientSecret(data.data.clientSecret)
    }
    fetchClientSecret()

  },[])
  useEffect(() => {
    const fetchClientSecret = async () => {
      const data = await axios.post('/card-payment', {
        amount: totalPrice,
      })
      setCardSecret(data.data.clientSecret)
    }
    fetchClientSecret()

  },[])


const handleChange = (e) => {

  setdisabled(e.empty)
  seterror(e.error ? e.error.message: '')

}
  
  const handlePayment = async (e) => {
    e.preventDefault();

    setprocessing(true)

    await stripe.confirmCardPayment(cardSecret,{

      payment_method: {
        card:elements.getElement(CardNumberElement), 
        billing_details:{
          address:{
            line1:address.street,
            postal_code:address.postcode,
            city:address.city,
          },
          email:user?.email,
          phone:address.phone
        },
      }
     })
     .then(() => {
      seterror(null)
      setprocessing(false)
      setsucceeded(true)
      
    window.localStorage.removeItem('cartItems')
     })

       const paymentCreate = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement),
        billing_details:{
          address:{
            line1:address.street,
            postal_code:address.postcode,
            city:address.city,
          },
          email:user?.email,
          phone:address.phone
        },
       })

       axios.post("/orders/add", {
            basket: basket,
       subtotal:getBasketTotal(basket),
      amount: totalPrice,
      email: user?.email,
      username: user?.username,
      address: address,
      paymentCreate: paymentCreate.paymentMethod,
      orderId:orderId,
      deliveryOptions:deliveryOptions.options,
      deliveryPrice:deliveryOptions.price,
     deliveryDate: today,
     paymentConfirm: succeeded
    })

      const {paymentIntent} = await stripe.retrievePaymentIntent(cardSecret);
  if (paymentIntent && paymentIntent.status === 'succeeded') {
    // Handle successful payment here
    
    
    axios.post('/emailproduct/sendemail', {
      result:basket,
      email:user?.email,
      subtotal:getBasketTotal(basket),
      totalAmount:totalPrice,
      address:address,
      paymentCreate:paymentCreate.paymentMethod,
      orderId:orderId,
      deliveryOptions:deliveryOptions.options,
      deliveryPrice:deliveryOptions.price,
      deliveryDate:today
    })
    
    axios.put('/orders/updatepayment', {
      orderId:orderId,
      paymentConfirm: paymentIntent.status
    })

    navigate('/')
    toast.success('Payment successful')

  } else {
    // Handle unsuccessful, processing, or canceled payments and API errors here
    axios.post('/emailproduct/failedpayment', {
      result:basket,
      email:user?.email,
      subtotal:getBasketTotal(basket),
      totalAmount:totalPrice,
      address:address,
      paymentCreate:paymentCreate.paymentMethod,
      orderId:orderId,
      deliveryOptions:deliveryOptions.options,
      deliveryPrice:deliveryOptions.price,
      deliveryDate:today,
    })

    navigate('/')
    toast.error('Payment declined')
  
  }
 
      
    dispatch({
      type: "EMPTY_BASKET",
    });

    }
    
  const inputStyle = {
    showIcon: true,
      iconStyle: "solid",
    };


    const [paymenttab,setpaymenttab] = useState(1)
    
    const [email,setemail] = useState('')

    const tab = (index) => {
      setpaymenttab(index)
    }

    const handleKlarna = async (e) => {

      e.preventDefault()

   
        await stripe.confirmKlarnaPayment(clientSecret, {
        payment_method:{
          billing_details:{
            address:{
              line1:address.street,
              postal_code:address.postcode,
              city:address.city,
              country:'GB'
            },
            email:user?.email,
          },
          },
        return_url:'http://localhost:3000/payment'
      })

   
}
    
  return (
    <>

    <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

    {/* {succeeded ? 
    <ConfirmLoader succeeded={succeeded}/>
  : <></>} */}

      <h2 className="text-center mt-5">Checkout Form</h2>

      <hr></hr>

      {basket.length === 0 && navigate("/") }


      {basket.length !== 0 && (


      <div  style={succeeded ? {filter:'brightness(50%)',pointerEvents:'none'} : {filter:'brightness(100%)',pointerEvents:'auto'}} className="container-fluid checkout-form py-4">

        <div className="billing-address h-100 bg-white rounded-1 bg-opacity-50 px-2">

          <div className="px-1 mt-2 address-input">
            <h5>Shipping Address</h5>
            <hr></hr>
            <p><span>FullName:</span> {user?.username}</p>
            <p><span>Street:</span> {address.street}</p>
            <p><span>City:</span> {address.city}</p>
            <p><span>PostCode:</span> {address.postcode}</p>
            <p><span>Contact No:</span> {address.phone}</p>
            <p><span>Email:</span> {!user ? 'Guest@this.com' : user?.email}</p>
           
          </div>

          <hr></hr>



          <div className="mt-2">

          <p>Estimated Delivery</p>
          <p className="d-flex"><i className="bi bi-truck"></i> <span className="mx-1">{today}</span></p>

    <hr></hr>

            <h6>Order History</h6>

          <Basket/>
           
          </div>
        </div>




        <div className="cart-list bg-white bg-opacity-50 h-50 px-2 border-2 rounded-1">

          <div className="d-flex h5 my-2 pb-3 justify-content-between px-2">
            <span>Your Cart</span>
            <span>{qty(basket)}</span>
          </div>
          <hr></hr>

          <div className="text-center d-flex justify-content-between px-2 align-items-center">
            <p>Subtotal</p>
            <p>£{getBasketTotal(basket).toFixed(2)}</p>
          </div>
          <hr />

          <div>
            <p>Delivery-Options:</p>
            <div className="d-flex justify-content-between align-items-center">
            <p>{deliveryOptions.options}</p> 
            <p>£{deliveryOptions.price}</p>
            </div>
          </div>

          <hr></hr>



          <div className="text-center d-flex justify-content-between px-2 align-items-center">
            <p>Total Price</p>
        
              <p className="">£{(getTotalBasketQty(basket) + parseFloat(deliveryOptions.price)).toFixed(2)}</p>
        
          </div>

          <hr />

          <div>

<button className={paymenttab === 1 ? "btn rounded-0 btn-primary" : 'btn rounded-0 btn-secondary'} onClick={()=> tab(1)}>Card</button>
<button className={paymenttab === 2 ? "btn rounded-0 btn-primary mx-1" : 'btn rounded-0 btn-secondary mx-1'} onClick={()=> tab(2)}>Klarna</button>

          <form onSubmit={handlePayment} className={paymenttab === 1 ? "d-block" : 'd-none'}>


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

          <div>

          <form className={paymenttab === 2 ? "d-block bg-white bg-opacity-50 p-2 text-center" : 'd-none'} onSubmit={handleKlarna}>

          <h5>Email</h5>
          <input type="email" value={user?.email} className="w-100 px-2 py-1" placeholder="Enter your email address"/>
            <br></br>
            <br></br>
            <button className="btn btn-warning rounded-0 px-2 py-1 ">Confirm Payment</button>

          </form>

          </div>

        </div>

      </div>

        </div>

        )}
    </>
  )
}

export default Payment

