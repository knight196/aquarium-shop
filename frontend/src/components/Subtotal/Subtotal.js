import React, { useState } from 'react'
import './Subtotal.css'
import {useStateValue} from '../../StateProvider'
import { getBasketTotal } from '../../reducer'
import {useNavigate,Link} from 'react-router-dom'


function Subtotal() {

const navigate = useNavigate();

  const [{basket,user}, dispatch] = useStateValue()

  return (
    <div className='subtotal'>
        <p>Subtotal ({basket.length} items): <strong>Total:£{getBasketTotal(basket)}</strong></p>
        <Link to={!user ? '/Login' : '/Address'} className="d-flex justify-content-center">
      <button className="border-0 bg-primary text-white p-1" onClick={e => navigate('/Address')}>Procced to Checkout</button>
        </Link>
    </div>
  )
}

export default Subtotal
