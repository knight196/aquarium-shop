import React, { useEffect, useState } from 'react';
import Plantsproductinfo from './Plantsproductinfo';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Loaders from '../../Loaders'

function ProductDetail(props) {

    const {products} = props;

    const { slug }=useParams();
    const [details, setDetails]=useState([])


    const fetchData = async () => {
        const res = await axios.get(`/api/plants/slug/${slug}`)
        setDetails(res.data)
    }

        useEffect(()=> {
        fetchData();
        },[slug])

        // useEffect(()=> {

        //     setDetails(products.find(item => (item.slug) ===slug ))
        // },[slug])


    return (
      <div className="px-2 my-5">
        {!details ? <Loaders/> :
           <div>
               <Plantsproductinfo  detail={details} />
           </div>
        }
      </div>
      
  )
}

export default ProductDetail