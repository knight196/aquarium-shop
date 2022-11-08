import React,{useEffect, useState} from 'react';
import './Payment.css';
import { useStateValue } from "../../StateProvider";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { Link,useNavigate } from "react-router-dom";
import { getBasketTotal } from '../../reducer'
import CheckoutForm from './Checkoutform'

import { loadStripe } from "@stripe/stripe-js";
import {useElements,CardElement,Elements,useStripe} from '@stripe/react-stripe-js'
import axios from 'axios';
import { toast } from 'react-toastify';

function Payment() {
    const [{address, basket,user}, dispatch] = useStateValue();

    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);


  useEffect(() => {
const fecthClientSecret = async () => {
  const data = await axios.post("/create-payment-intent", {
    amount: getBasketTotal(basket)
  })
  setClientSecret(data.data.clientSecret)
}
fecthClientSecret();
console.log('client secret is', clientSecret)
  },[])


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

    return (
        <>

        {basket.length === 0 && (window.location.href="/") &&  (window.localStorage.removeItem('basket'))}
        
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
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            packaging={item.packaging}
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
        <hr/>
           
        
        <div className="text-center d-flex justify-content-between px-2 align-items-center">
          <p>Total Price</p> 
          <p>£{getBasketTotal(basket).toFixed(2)}</p>
          </div>
        
            <hr/>

            <div className="text-center ">

            {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}

{/* <CardElement/>
<button className="p-2 m-2 btn border-0 rounded-1 bg-warning" onClick={handlePayment}>Confirm Payment</button> */}

</div>
        
        
            </div>
        
                    </div>
            </>
    )
}

export default Payment

                       