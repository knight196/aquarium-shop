import { useEffect, useState, useRef,useMemo } from 'react';
import './Payment.css';
import { useStateValue } from "../../StateProvider";
import { Link, useNavigate } from "react-router-dom";
import { getBasketTotal, getTotalBasketQty, qty } from '../../reducer'
import { toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js'

import { CardElement, useElements,useStripe,CardCvcElement,CardExpiryElement,CardNumberElement} from '@stripe/react-stripe-js'
import axios from 'axios'

function Payment() {
  const [{ address, basket, user,deliveryOptions }, dispatch] = useStateValue();
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
    localStorage.setItem('address', JSON.stringify(address))
  },[address])





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

  const totalPrice = (getTotalBasketQty(basket) + parseFloat(deliveryOptions.price)).toFixed(2)

  console.log(totalPrice)

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
      deliveryPrice:deliveryOptions.price
    });


   

    axios.post('/api/sendemail', {
      result:basket,
      email:user?.email,
      subtotal:getBasketTotal(basket),
      totalAmount:totalPrice,
      address:address,
      paymentCreate:paymentCreate.paymentMethod,
      orderId:orderId,
      deliveryOptions:deliveryOptions.options,
      deliveryPrice:deliveryOptions.price
    })
    
    
    dispatch({
      type: "EMPTY_BASKET",
    });
    navigate('/')
    toast.success('Payment successful')
    window.localStorage.removeItem('cartItems')

      .catch((err) => console.warn(err));


    }


    const updatecart  = async (item,quantity, id) => {

      await axios.put(`/orders/decrement/${id}`, {slug: item.slug})
      
          dispatch({
            type:'ADD_TO_BASKET',
            item:{...item,quantity}
          })
      
          window.location.href='/Checkout'
      
        }
      
      
      const incrementCart  = async (item,quantity,id) => {
      
        await axios.put(`/orders/increment/${id}`, {slug: item.slug})
      
        dispatch({
          type:'ADD_TO_BASKET',
          item:{...item,quantity}
        })
      
        window.location.href='/Checkout'
      
      
        }
      
        const removeFromBasket = (item) => {
          dispatch({type:'REMOVE_FROM_BASKET', item:item})
          window.location.href='/Checkout'
      }
      
      const updateCart  = async (item,quantity) => {
      
      
        dispatch({
          type:'ADD_TO_BASKET',
          item:{...item,quantity}
        })
      
        window.location.href='/Checkout'
      
      
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
            <div className='checkoutProduct'>

            <div className="bg-white mx-1">
            <img className='checkoutProduct__image img-fluid' src={item.image.url} alt=""/>
            </div>
          
          <div className='checkoutProduct__info'>
              <p className='checkoutProduct__title'>{item.title}</p>
              <p>{item.packaging}</p>
              <p>{item.color}</p>
                  <strong>£{item.price}</strong>
                  {!item.packaging ? (
                    
                    
                    <div>
                <button onClick={()=>updateCart(item,item.quantity -1)} disabled={item.quantity ===1} className="border-0 px-1">-</button>
                <label>{item.quantity}</label>
                <button onClick={()=> updateCart(item,item.quantity + 1)} className="border-0 px-1 mx-2">+</button>
                </div>
                      
                    ) : 
                    (
  <>
  {item.variants.map(variant => {
                if(variant.packaging === item.packaging)
                return (
                  <div>
                <button onClick={()=>incrementCart(item,item.quantity -1,variant._id)} disabled={item.quantity ===1} className="border-0 px-1">-</button>
                <label>{item.quantity}</label>
                <button onClick={()=> updatecart(item,item.quantity + 1, variant._id)} disabled={item.quantity === variant.quantity} className="border-0 px-1 mx-2">+</button>
                </div>
  
  
                  )
              })}
  </>
                    )}
             

              <button onClick={()=> removeFromBasket(item)}>Remove</button>
      

          </div>
      
      
          
          </div>
          ))}
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
            <div className="text-center ">
            <button className="bg-warning px-2 py-1 m-2 rounded-1 border-0" onClick={handlePayment}>Confirm Payment</button>
            </div>
            
          </div>


        </div>

      </div>
    </>
  )
}

export default Payment

