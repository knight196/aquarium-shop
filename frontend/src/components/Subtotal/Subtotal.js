import React, { useState,useEffect } from 'react'
import './Subtotal.css'
import { getBasketTotal } from '../../reducer'
import {useStateValue} from '../../StateProvider'
import {useNavigate,Link} from 'react-router-dom'


function Subtotal() {

const navigate = useNavigate();

  const [{basket,user,deliveryOptions}, dispatch] = useStateValue()

  const [deliveryOption,setdeliveryOptions] = useState('standard')

  const [price,setprice] = useState(4.99)

  const deliverySelect = (e,price) => {
  setdeliveryOptions(`${e.target.value}`)
  setprice(`${price}`)
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

  console.log(deliveryOption,price)

  return (
    <div className='subtotal'>

      <div>

        <h5>Delivery Options</h5>

<input type="radio" value="standard"  checked={deliveryOption === 'standard'} onChange={(e)=> deliverySelect(e,4.99)}/> <label>Standard £4.99 -- 2-3 working days</label>

<br></br>

<input type="radio" value="tracked" checked={deliveryOption === 'tracked'} onChange={(e)=>deliverySelect(e,5.99)}/> <label>Tracked £5.99</label>




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
