import { useEffect, useState, useRef,useMemo } from 'react';
import './Payment.css';
import { useStateValue } from "../../StateProvider";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { getBasketTotal } from '../../reducer'
import { toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js'
import emailjs from '@emailjs/browser';


import { CardElement, useElements,useStripe,CardCvcElement,CardExpiryElement,CardNumberElement} from '@stripe/react-stripe-js'
import axios from 'axios'

function Payment() {
  const [{ address, basket, user }, dispatch] = useStateValue();

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);





  // const handlePayment = async (e) => {
  //   e.preventDefault();
  //   await stripe.confirmCardPayment({
  //     elements,
  //     confirmParams:{
  //       return_url:'/'
  //     }
  //   })
  //   .then((result) => {
  //       if(result.paymentIntent){
  //    axios.post("/orders/add", {
  //       basket: basket,
  //       price: getBasketTotal(basket),
  //       email: user?.email,
  //       username:user?.username,
  //       address: address,
  //     });

  //     dispatch({
  //       type: "EMPTY_BASKET",
  //     });
  //     navigate("/");
  //     toast.success('Payment successful')
  //   }
  //   })
  //   .catch((err) => console.warn(err));
  // }

  const elements = useElements();
  const stripe = useStripe();


  useEffect(() => {
    const fetchClientSecret = async () => {
      const data = await axios.post('/create-payment-intent', {
        amount: getBasketTotal(basket)
      })
      setClientSecret(data.data.clientSecret)
    }
    fetchClientSecret()
    console.log('client secret is ', clientSecret)
  }, [])


  const handlePayment = async (e) => {
    e.preventDefault();

    await stripe.confirmCardPayment(clientSecret,{
      payment_method: {
        card:elements.getElement(CardNumberElement), 
    }  
    })

    const paymentCreate = await stripe.createPaymentMethod({
      type: 'card',

      card: elements.getElement(CardNumberElement),
    })

    axios.post("/orders/add", {
      basket: basket,
      amount: getBasketTotal(basket),
      email: user?.email,
      username: user?.username,
      address: address,
      paymentCreate: paymentCreate.paymentMethod
    });



    dispatch({
      type: "EMPTY_BASKET",
    });
    navigate("/");
    toast.success('Payment successful')
    window.localStorage.removeItem('basket')



      .catch((err) => console.warn(err));

  }

  


  return (
    <>

      {basket.length === 0 && (window.location.href = "/") && (window.localStorage.removeItem('basket'))}

      <h2 className="text-center">Checkout Form</h2>

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
            <p><span>Email:</span> {!user ? 'Guest@this.com' : user?.email}</p>
            <p><span>PhoneNumber:</span> {address.phone}</p>
          </div>

          <hr></hr>



          <div className="mt-2">


            <h6>Order History</h6>
            {basket.map(item => (
              <CheckoutProduct
                slug={item.slug}
                title={item.title}
                image={item.image}
                price={item.price}
                packaging={item.packaging}
                color={item.color}
              />
            ))}
          </div>
        </div>




        <div className="cart-list bg-white bg-opacity-50 h-50 px-2 border-2 rounded-1">

          <div className="d-flex h5 my-2 pb-3 justify-content-between px-2">
            <span>Your Cart</span>
            <span>{basket.length === 0 ? "" : basket.length}</span>
          </div>
          <hr></hr>

          <div className="text-center d-flex justify-content-between px-2 align-items-center">
            <p>Subtotal</p>
            <p>£{getBasketTotal(basket).toFixed(2)}</p>
          </div>
          <hr />


          <div className="text-center d-flex justify-content-between px-2 align-items-center">
            <p>Total Price</p>
            <p>£{getBasketTotal(basket).toFixed(2)}</p>
          </div>

          <hr />

          <div>


  
            {/* {stripePromise && clientSecret && (
              <Elements stripe={stripePromise} options={{clientSecret}}>
              <form id="payment-form" onSubmit={handlePayment}>
    <PaymentElement id="payment-element"/>
    <button className="p-2 bg-primary btn text-white border-0 m-2 rounded-1">Pay Now</button>
  </form>
              </Elements>
    )} */}
<div className="bg-white bg-opacity-50 p-2">

<small>Card Number</small>
<CardNumberElement className="bg-white rounded-1 p-2"/>

<div className="d-flex justify-content-between">
  <div className="w-50">

  <small>Expiry</small>
            <CardExpiryElement className="bg-white p-2 rounded-1"/> 
  </div>
    
            <div style={{marginLeft:'10px'}} className="w-50">
            <small>CVC</small>
            <CardCvcElement className="bg-white p-2 rounded-1"/>
            </div>
</div>
         

</div>

            {/* <CardElement /> */}
            <div className="text-center">
            <button className="p-2 m-2 btn border-0 rounded-1 bg-warning" onClick={handlePayment}>Confirm Payment</button>
            </div>
            
          </div>


        </div>

      </div>
    </>
  )
}

export default Payment

