import {useEffect,useState} from 'react'
import {useMutation} from '@apollo/client'
import {decrementQty,incrementQty,removeProductQty} from '../GraphQLData/Mutation' 
import { useStateValue } from '../../StateProvider'
import {GetProducts} from '../GraphQLData/GetProducts'

export default function ProductQty({item}) {


    let [{}, dispatch] = useStateValue()


const [decrementProductQty] = useMutation(decrementQty, {variables:{slug:item.slug},refetchQueries:[{query:GetProducts}]})
const [incrementProductQty] = useMutation(incrementQty, {variables:{slug:item.slug},refetchQueries:[{query:GetProducts}]})
const [removeProductAdd] = useMutation(removeProductQty, {variables:{slug:item.slug,quantity:item.quantity},refetchQueries:[{query:GetProducts}]})

//without product variant stock change  increment
const incrementProduct  = async (item,quantity,slug) => {
    incrementProductQty()
    dispatch({
        type:'ADD_TO_BASKET',
      item:{...item,quantity}
    })
    window.location.reload();
    }
  
    //without product variant stock change decrement
    
    const decrementProduct = async (item,quantity,slug) => {
        decrementProductQty()
      dispatch({
        type:'ADD_TO_BASKET',
        item:{...item,quantity}
      })
      window.location.reload();
    }
  
      //remove the  product from the basket
      const removeProductIncrement = async(item,slug) => {      
            removeProductAdd()
            dispatch({type:'REMOVE_FROM_BASKET', item:item})
            window.location.reload();
        }
  
  return (
<div>
<button onClick={()=>incrementProduct(item,item.quantity -1)} disabled={item.quantity ===1} className="border-0 px-1">-</button>
<label>{item.quantity}</label>
<button onClick={()=> decrementProduct(item,item.quantity + 1)} className="border-0 px-1 mx-2">+</button>
<br></br>
<button className="border-0 bg-warning px-2 py-1 my-1" onClick={()=> removeProductIncrement(item)}>Remove</button>
</div>
  )
}

// {/* <button onClick={()=>incrementProduct(item,item.quantity -1)} disabled={item.quantity ===1} className="border-0 px-1">-</button>
// <label>{item.quantity}</label>
// <button onClick={()=> decrementProduct(item,item.quantity + 1,item.slug)} className="border-0 px-1 mx-2">+</button>
//  <br></br>
// <button className="border-0 bg-warning px-2 py-1 my-1" onClick={()=> removeProductIncrement(item,item.slug)}>Remove</button> */}