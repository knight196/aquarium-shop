import React,{useState,useEffect} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import './Checkout.css'
import { useStateValue } from '../../StateProvider'
import { getBasketTotal,getTotalBasketQty } from '../../reducer'
import { qty } from '../../reducer'
import axios from 'axios'

function Checkout() {

  let [{user,deliveryOptions,basket}, dispatch] = useStateValue()


  const navigate = useNavigate();
  
  
  const [deliveryOption,setdeliveryOptions] = useState('Standard')
  
  const [price,setprice] = useState(4.99)
  
  
const deliveries = [
  {
    options:'Standard',
    price:4.99
  },
  {
    options:'Tracked',
    price:5.99
  }
]


const deliverySelect = (e,price) => {
setdeliveryOptions(e.target.value)
setprice(price)
}

useEffect(() => {
  dispatch({
    type:'SET_DELIVERY',
    payload:{
      options:deliveryOption,
      price:price
    }
  })
},[deliveryOption])



  useEffect(() => {
    localStorage.setItem('deliveryOptions', JSON.stringify(deliveryOptions))
  },[deliveryOptions])

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



function process(){
  if(!user){
    navigate('/Login')
  }else{
    navigate('/Address')
  }
}

console.log(basket)

  return (
<>

   {basket.length === 0 && (<p className="text-center h1">Your Cart is Empty</p>) }
{basket.length !== 0 && (

  
  <div className="checkout h-100 bg-white rounded-1 bg-opacity-50">

     <div className='checkout__left'>

      
    
        <h2 className="checkout__title">Your shopping basket</h2>

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

<div className='checkout__right'>
<div className='subtotal bg-secondary bg-opacity-50 p-2'>

<div>

  <h5>Delivery Options</h5>

{deliveries.map(item => (
<>
<input type="radio" value={item.options} checked={deliveryOption === item.options} onChange={(e) => deliverySelect(e,item.price)}/> <label>{item.options} + {item.price}</label> <br></br>
</>
))}


</div>

<hr/>

  <p>Subtotal({qty(basket)} items): £{getBasketTotal(basket).toFixed(2)}</p>
  
  <p>Delivery-Options: {deliveryOptions.options} + £{deliveryOptions.price}</p>
  <strong>Total:£{(getTotalBasketQty(basket) + parseFloat(deliveryOptions.price)).toFixed(2)}</strong>
  
  <div className="d-flex justify-content-center">
<button className="border-0 bg-primary text-white p-1" onClick={process}>Procced to Checkout</button>
  </div>
</div>
</div>

    </div>

)}      
</>
  )
}

export default Checkout
