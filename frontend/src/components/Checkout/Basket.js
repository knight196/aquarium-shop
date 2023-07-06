import React, {useEffect, useState} from 'react';
import './Checkout.css'
import { useStateValue } from '../../StateProvider'


import axios from 'axios'

function Checkout() {

  let [{basket}, dispatch] = useStateValue()


  //product variant stock quantity decrement for plants selection
const updatecart  = async (item,quantity, id) => {

await axios.put(`/product/decrement/${id}`, {slug: item.slug})

    dispatch({
      type:'ADD_TO_BASKET',
      item:{...item,quantity}
    })

    window.location.reload();
  }



//product variant stock quantity increment for plants selection
const incrementCart  = async (item,quantity,id) => {

  await axios.put(`/product/increment/${id}`, {slug: item.slug})

  dispatch({
    type:'ADD_TO_BASKET',
    item:{...item,quantity}
  })
  window.location.reload();


  }

  //remove the plants product from the basket
  const removePlantsIncrement = async(item,id) => {

await axios.put(`/product/removePlantsIncrement/${id}`, {slug:item.slug,quantity:item.quantity})
    

    dispatch({type:'REMOVE_FROM_BASKET', item:item})

    window.location.reload();
}

//without product variant stock change  increment
const incrementProduct  = async (item,quantity,slug) => {

  await axios.put(`/product/productincrement/${slug}`)

  dispatch({
    type:'ADD_TO_BASKET',
    item:{...item,quantity}
  })

  window.location.reload();


  }

  //without product variant stock change decrement

  const decrementProduct = async (item,quantity,slug) => {

    await axios.put(`/product/productdecrement/${slug}`)

    dispatch({
      type:'ADD_TO_BASKET',
      item:{...item,quantity}
    })

    window.location.reload();

  }

    //remove the  product from the basket
    const removeProductIncrement = async(item,slug) => {

      await axios.put(`/product/removeProductIncrement/${slug}`, {quantity:item.quantity})
          
      
          dispatch({type:'REMOVE_FROM_BASKET', item:item})
          window.location.reload();
      }


    //product variant stock quantity decrement for color selection
const colordecrement  = async (item,quantity, id) => {

  await axios.put(`/product/colordecrement/${id}`, {slug: item.slug})
  
      dispatch({
        type:'ADD_TO_BASKET',
        item:{...item,quantity}
      })
  
      window.location.reload();
  
    }
  
  //product variant stock quantity increment for color selection
  const colorincrement  = async (item,quantity,id) => {
  
    await axios.put(`/product/colorincrement/${id}`, {slug: item.slug})
  
    dispatch({
      type:'ADD_TO_BASKET',
      item:{...item,quantity}
    })
  
    window.location.reload();
  
  
    }

  //remove the color product from the basket
  const removeColorIncrement = async(item,id) => {

    await axios.put(`/product/removeColorIncrement/${id}`, {slug:item.slug,quantity:item.quantity})
        dispatch({type:'REMOVE_FROM_BASKET', item:item})
        window.location.reload();
    }



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
                  <>
                  {item.colors.map(color => {
                    if(color.colors === item.color){
                      return(
                        <div>
                     <button onClick={()=>colorincrement(item,item.quantity -1,color._id)} disabled={item.quantity ===1} className="border-0 px-1">-</button>
                     <label>{item.quantity}</label>
                     <button onClick={()=> colordecrement(item,item.quantity + 1, color._id)} disabled={item.quantity === color.quantity} className="border-0 px-1 mx-2">+</button>
                     <br></br>
                     <button className="border-0 bg-warning px-2 py-1 my-1" onClick={()=> removeColorIncrement(item,color._id)}>Remove</button>
                     </div>
                    )
                  }
                    })}
                  </>
                 ) : (
                  <>

{!item.packaging ? (


<div>
<button onClick={()=>incrementProduct(item,item.quantity -1,item.slug)} disabled={item.quantity ===1} className="border-0 px-1">-</button>
<label>{item.quantity}</label>
<button onClick={()=> decrementProduct(item,item.quantity + 1,item.slug)} className="border-0 px-1 mx-2">+</button>
<br></br>
<button className="border-0 bg-warning px-2 py-1 my-1" onClick={()=> removeProductIncrement(item,item.slug)}>Remove</button>
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
<br></br>
<button className="border-0 bg-warning px-2 py-1 my-1" onClick={()=> removePlantsIncrement(item,variant._id)}>Remove</button>
</div>


)
})}
</>

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
