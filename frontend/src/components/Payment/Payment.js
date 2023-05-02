import { useEffect, useState, useRef,useMemo } from 'react';
import './Payment.css';
import { useStateValue } from "../../StateProvider";
import { Link, useNavigate } from "react-router-dom";
import { getBasketTotal, getTotalBasketQty, qty } from '../../reducer'
import { toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutSteps from '../CheckoutSteps';

import Basket from '../Checkout/Basket'

import { CardElement, useElements,useStripe,CardCvcElement,CardExpiryElement,CardNumberElement} from '@stripe/react-stripe-js'
import axios from 'axios'


function Payment() {
  const [{ address, basket, user,deliveryOptions }, dispatch] = useStateValue();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [processing,setprocessing] = useState('')
  const [error,seterror] = useState(null)
  const [disabled,setdisabled] = useState(true)
  const [succeeded,setsucceeded] = useState(false)


  const navigate = useNavigate();

  useEffect(() => {
    fetch("/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('address', JSON.stringify(address))
  },[address])



  const elements = useElements();
  const stripe = useStripe();

  const totalPrice = (getTotalBasketQty(basket) + parseFloat(deliveryOptions.price)).toFixed(2)



  useEffect(() => {
    const fetchClientSecret = async () => {
      const data = await axios.post('/create-payment', {
        amount: totalPrice
      })
      setClientSecret(data.data.clientSecret)
    }
    fetchClientSecret()
    console.log('client secret is ', clientSecret)
  }, [])

const handleChange = (e) => {

  setdisabled(e.empty)
  seterror(e.error ? e.error.message: '')

}



var today = new Date()

var dd = String(today.getDate()).padStart(2,'0')

var mm = String(today.getMonth() + 1).padStart(2,'0')

var yyyy = today.getFullYear()

var fullDate = dd + '.' + mm + '.' + yyyy

var someDate = new Date()



      
      //standard delivery

    var numberOfDaysToAdd = deliveryOptions.options === 'Standard' ? 2 : 1
    
  someDate.setDate(someDate.getDate() + numberOfDaysToAdd)

  var DD = String(someDate.getDate()).padStart(2,'0')

  var MM = String(someDate.getMonth() + 1).padStart(2,'0')

  var y = someDate.getFullYear()
  
  var someFormattedDate = DD + '.' + MM + '.' + y
  
  today = fullDate + ' - ' + someFormattedDate


  //nextDay delivery

    
  someDate.setDate(someDate.getDate() + numberOfDaysToAdd)

  var date = String(someDate.getDate()).padStart(2,'0')

  var month = String(someDate.getMonth() + 1).padStart(2,'0')

  var year = someDate.getFullYear()
  
  var someFormattedDates = date + '.' + month + '.' + year
  
  today = fullDate + ' - ' + someFormattedDates

  
  
  
  const handlePayment = async (e) => {
    e.preventDefault();

    setprocessing(true)

    await stripe.confirmCardPayment(clientSecret,{
      payment_method: {
        card:elements.getElement(CardNumberElement), 
      }  
    }).then(({paymentIntent}) => {
      setsucceeded(true)
      setprocessing(false)
      seterror(null)

      navigate('/')
      toast.success('Payment successful')
      window.localStorage.removeItem('cartItems')
  
    })

    const paymentCreate = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
    })

    const orderId = crypto.randomUUID().slice(0,20)

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
     deliveryDate: today
    });

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
    
    
    dispatch({
      type: "EMPTY_BASKET",
    });
   

    }

    const inputStyle = {
      showIcon: true,
      iconStyle: "solid",
    };


    
  return (
    <>

    <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      {basket.length === 0 && (window.location.href = "/") && (window.localStorage.removeItem('basket'))}

      <h2 className="text-center mt-5">Checkout Form</h2>

      <hr></hr>

      <div className="container-fluid checkout-form py-4">

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
         
            {/* <CardElement onChange={handleChange}/> */}

</div>


            <div className="text-center ">
              {error && <p>{error}</p>}
            <button disabled={processing || disabled || succeeded} className="bg-warning px-2 py-1 m-2 rounded-1 border-0">
              <span>{processing ? <span className="spinner-border text-primary spinner-border-sm"></span> : 'Confirm Payment'}</span>
              </button>
            </div>
            
          </form>


        </div>

      </div>
    </>
  )
}

export default Payment

