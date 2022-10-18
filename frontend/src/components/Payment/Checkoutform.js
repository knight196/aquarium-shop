import { PaymentElement } from "@stripe/react-stripe-js";
import { useState,useEffect } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useStateValue } from "../../StateProvider";
import axios from 'axios'
import {toast} from 'react-toastify'
import { getBasketTotal } from '../../reducer'
import {useNavigate} from 'react-router-dom'
export default function Checkoutform() {

    const navigate  = useNavigate();

    const elements = useElements();
    const stripe = useStripe();
  
  

    const [{address, basket,user}, dispatch] = useStateValue();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    
  const handlePayment = async (e) => {
    e.preventDefault();
    await stripe.confirmPayment({
      elements,
      confirmParams:{
        return_url:'/'
      }
    })
    .then((result) => {
     axios.post("/orders/add", {
        basket: basket,
        price: getBasketTotal(basket),
        email: user?.email,
        username:user?.username,
        address: address,
      });

      dispatch({
        type: "EMPTY_BASKET",
      });
      navigate("/");
      toast.success('Payment successful')

     window.localStorage.removeItem('basket')

    })
    .catch((err) => console.warn(err));
  }
  

  return (
    <form id="payment-form" onSubmit={handlePayment}>
    <PaymentElement id="payment-element"/>
    <button className="p-2 bg-primary btn text-white border-0 m-2 rounded-1">Pay Now</button>
  </form>
  )
}
