import React from 'react'
import {PlantsIncrement,Plantsdecrement,removePlants} from '../GraphQLData/Mutation' 
import { useStateValue } from '../../StateProvider'
import {GetProducts} from '../GraphQLData/GetProducts'
import {useMutation} from '@apollo/client'

export default function PlantsQty({item}) {

  const [{}, dispatch] = useStateValue()

  const id = item.variants.map(variant => variant.packaging === item.packaging && variant._id).filter(function(x){
    return x !== false
  }).toString()

  console.log(id)

  const [PlantsInc] = useMutation(PlantsIncrement, {variables:({slug:item.slug, _id:id}), refetchQueries:[{query:GetProducts}]})
  const [PlantsDec] = useMutation(Plantsdecrement, {variables:({slug:item.slug, _id:id}), refetchQueries:[{query:GetProducts}]})
  const [PlantsRemove] = useMutation(removePlants, {variables:({slug:item.slug, _id:id, quantity:item.quantity}), refetchQueries:[{query:GetProducts}]})


//product variant stock quantity decrement for plants selection
const updatecart  = async (item,quantity,e) => {
  PlantsDec()    
  dispatch({
        type:'ADD_TO_BASKET',
        item:{...item,quantity}
      })
  
      window.location.reload();
    }
  
  
  
  //product variant stock quantity increment for plants selection
  const incrementCart  = async (item,quantity,id) => {
   PlantsInc()
    dispatch({
      type:'ADD_TO_BASKET',
      item:{...item,quantity}
    })
    window.location.reload();
  
  
    }
  
    //remove the plants product from the basket
    const removePlantsIncrement = async(item,id) => {
      PlantsRemove()
      dispatch({type:'REMOVE_FROM_BASKET', item:item})
  
      window.location.reload();
    }
  

  return (
    <>
    {item.variants.map(variant => {
      if(variant.packaging === item.packaging)
      return (
      <div>
      <button onClick={()=>incrementCart(item,item.quantity -1)} disabled={item.quantity ===1} className="border-0 px-1">-</button>
      <label>{item.quantity}</label>
      <button onClick={()=> updatecart(item,item.quantity + 1)} disabled={item.quantity === variant.quantity} className="border-0 px-1 mx-2">+</button>
      <br></br>
      <button className="border-0 bg-warning px-2 py-1 my-1" onClick={()=> removePlantsIncrement(item)}>Remove</button>
      </div>
      
      
      )
    })}

    </>

  )
}

// {/* <div>
// <button onClick={()=>incrementProduct(item,item.quantity -1,item.slug)} disabled={item.quantity ===1} className="border-0 px-1">-</button>
// <label>{item.quantity}</label>
// <button onClick={()=> decrementProduct(item,item.quantity + 1,item.slug)} className="border-0 px-1 mx-2">+</button>
// <br></br>
// <button className="border-0 bg-warning px-2 py-1 my-1" onClick={()=> removeProductIncrement(item,item.slug)}>Remove</button>
// </div> */}
