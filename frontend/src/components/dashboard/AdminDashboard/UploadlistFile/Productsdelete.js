import { useMutation } from '@apollo/client'
import React from 'react'
import {ProductDelete} from '../../../GraphQLData/Mutation'
import {toast} from 'react-toastify'
import {GetProducts} from '../../../GraphQLData/GetProducts'

export default function Productsdelete({id}) {

const [deleteProducts] = useMutation(ProductDelete, {variables:{_id:id},refetchQueries:[{query:GetProducts}]})

    const deletelist = async (id) => {
  deleteProducts()
 toast.success('Your product has been deleted successfully')
 setTimeout(function (){
  window.location.reload()
 },1500)
}


  return (
    <div>
       <button onClick={deletelist} style={{fontSize:'10px'}} className="btn w-100 bg-danger text-white">Delete</button>
    </div>
  )
}
