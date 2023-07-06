import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import Loaders from '../../Loaders'

export default function Other() {

    const [addedproducts,setaddedproducts] = useState([])

    const [loading,setloading] = useState(false)

    const getadded = async () => {
      const res = await axios.get('/product/products')
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
  if(item.category=== 'other'){
    return(
      <motion.div  initial={{opacity:0}} animate={{opacity:1}} className="product-card" >
  <img  src={item.image.url} alt={item.title}/>
  <p>{item.title}</p>
  <button className="btn bg-dark"><Link className="text-white" to={`/api/products/slug/${item.slug}`}>View More</Link></button>
</motion.div>
  )
}
})}

</div> : <Loaders/>
}
</>
  )
}
