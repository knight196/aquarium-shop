import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Loaders from '../../Loaders'

export default function Soil() {


    const [addedproducts,setaddedproducts] = useState([])

    const [loading,setloading] = useState(false)

    const getadded = async () => {
      const res = await axios.get('/api/products')
      setaddedproducts(res.data.products)
      setloading(true)
    }
    
    useEffect(() => {
      getadded();
    },[])

  return (
    <>
    {loading ?  
    <div className="product">
      {addedproducts.map((item)=> {
  if(item.category=== 'Soil'){
    return(
      <div className="product-card" >
  <img  src={item.image.url} alt={item.title}/>
  <p>{item.title}</p>
  <button className="btn bg-dark"><Link className="text-white" to={`/api/products/slug/${item.slug}`}>View More</Link></button>
</div>
  )
}
})}
    </div> : <Loaders/>
}
</>
  )
}
