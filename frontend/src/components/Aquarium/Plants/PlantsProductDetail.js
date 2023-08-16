import React, { useEffect, useState } from 'react';
import Plantsproductinfo from './Plantsproductinfo';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Loaders from '../../Loaders'
import {singleProduct} from '../../GraphQLData/GetProducts'
import {useQuery} from '@apollo/client'

function ProductDetail() {


    const { slug }=useParams();

    const {data} = useQuery(singleProduct, {variables:{slug:slug}})

    const [details, setDetails]=useState([])

    const [loading,setloading] = useState(false)

    const fetchData = async () => {
      if(data){
        setDetails(data.product)
      }
        setloading(true)
    }

        useEffect(()=> {
        fetchData();
        },[data])

    


    return (
      <div className="px-2 my-5">
        {loading ? 
           <div>
               <Plantsproductinfo  detail={details} />
           </div>

           :

           <Loaders/>
        }
      </div>
      
  )
}

export default ProductDetail