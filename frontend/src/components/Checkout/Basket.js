import React, {useEffect, useState} from 'react';
import './Checkout.css'
import { useStateValue } from '../../StateProvider'
import ProductQty from './ProductQty'
import PlantsQty from './PlantsQty'
import ColorQty from './ColorQty'

import axios from 'axios'
import Color from './ColorQty';

function Checkout() {

  let [{basket}, dispatch] = useStateValue()

  return (
<>

   {basket.length === 0 && (<p className="text-center h1">Your Cart is Empty</p>) }
{basket.length !== 0 && (



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

                  
                 
                 {item.color ? (
                  <ColorQty item={item}/>
                 ) : (
                  <>

{!item.packaging ? (

<ProductQty item={item}/>

) : 
(

<PlantsQty item={item}/>
)}
                  </>
                 )}
                
                  
                  
                  </div>
                  
                  
                  
                  </div>
                  ))}
                  
                  
      

     </div>
     

)}      
</>
  )
}

export default Checkout
