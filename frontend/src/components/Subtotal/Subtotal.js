import React, { useState,useEffect } from 'react'
import './Subtotal.css'
import { getBasketTotal } from '../../reducer'
import {useStateValue} from '../../StateProvider'
import {useNavigate,Link} from 'react-router-dom'


function Subtotal() {

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

const navigate = useNavigate();

  const [{basket,user,deliveryOptions}, dispatch] = useStateValue()

  const [deliveryOption,setdeliveryOptions] = useState('Standard')

  const [price,setprice] = useState(4.99)

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


  return (
    <div className='subtotal'>

      <div>

        <h5>Delivery Options</h5>

{deliveries.map(item => (
  <>
  <input type="radio" value={item.options} checked={deliveryOption === item.options} onChange={(e) => deliverySelect(e,item.price)}/> <label>{item.options} + {item.price}</label> <br></br>
  </>
))}


      </div>

      <hr/>

        <p>Subtotal({basket.length} items): £{getBasketTotal(basket).toFixed(2)}</p>
        
        <p>Delivery-Options: {deliveryOptions.options} + £{deliveryOptions.price}</p>
        <strong>Total:£{(getBasketTotal(basket) + parseFloat(deliveryOptions.price)).toFixed(2)}</strong>
        
        <Link to={!user ? '/Login' : '/Address'} className="d-flex justify-content-center">
      <button className="border-0 bg-primary text-white p-1" onClick={e => navigate('/Address')}>Procced to Checkout</button>
        </Link>
    </div>
  )
}

export default Subtotal
