import React from 'react'
import {useStateValue} from '../../StateProvider'
import {useMutation} from '@apollo/client'
import {removeColor,ColorIncrement,ColorDecrement} from '../GraphQLData/Mutation'
import { GetProducts} from '../GraphQLData/GetProducts'

export default function Color({item}) {


  const id = item.colors.map(color => color.colors === item.color && color._id).filter(function(x){
    return x !== false
  }).toString()
  

  const [colorInc] = useMutation(ColorIncrement, {variables: {slug:item.slug, _id:id}, refetchQueries:[{query:GetProducts}]})
  const [colorDec] = useMutation(ColorDecrement, {variables: {slug:item.slug, _id:id}, refetchQueries:[{query:GetProducts}]})
  const [colorRemove] = useMutation(removeColor, {variables: {slug:item.slug, _id:id, quantity:item.quantity}, refetchQueries:[{query:GetProducts}]})

  const [{},dispatch] = useStateValue()

    //product variant stock quantity decrement for color selection
    const colordecrement  = async (item,quantity, id) => {    
          colorDec()
          dispatch({
            type:'ADD_TO_BASKET',
            item:{...item,quantity}
          })
      
          window.location.reload();
      
        }
      
      //product variant stock quantity increment for color selection
      const colorincrement  = async (item,quantity,id) => {
        colorInc()
        dispatch({
          type:'ADD_TO_BASKET',
          item:{...item,quantity}
        })
      
        window.location.reload();
      
      
        }
    
      //remove the color product from the basket
      const removeColorIncrement = async(item,id) => {
          colorRemove()
            dispatch({type:'REMOVE_FROM_BASKET', item:item})
            window.location.reload();
        }
    
    

  return (
    <>
                  {item.colors.map(color => {
                    if(color.colors === item.color){
                      return(
                        <div>
                     <button onClick={()=>colorincrement(item,item.quantity -1)} disabled={item.quantity ===1} className="border-0 px-1">-</button>
                     <label>{item.quantity}</label>
                     <button onClick={()=> colordecrement(item,item.quantity + 1)} disabled={item.quantity === color.quantity} className="border-0 px-1 mx-2">+</button>
                     <br></br>
                     <button className="border-0 bg-warning px-2 py-1 my-1" onClick={()=> removeColorIncrement(item)}>Remove</button>
                     </div>
                    )
                  }
                    })}
                  </>
  )
}


// <div>
// <button onClick={()=>colorincrement(item,item.quantity -1,color._id)} disabled={item.quantity ===1} className="border-0 px-1">-</button>
// <label>{item.quantity}</label>
// <button onClick={()=> colordecrement(item,item.quantity + 1, color._id)} disabled={item.quantity === color.quantity} className="border-0 px-1 mx-2">+</button>
// <br></br>
// <button className="border-0 bg-warning px-2 py-1 my-1" onClick={()=> removeColorIncrement(item,color._id)}>Remove</button>
// </div>
