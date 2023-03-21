import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import Loaders from '../../Loaders'

export default function Heater() {

    const [addedproducts,setaddedproducts] = useState([])

    const getadded = async () => {
      const res = await axios.get('/api/products')
      setaddedproducts(res.data.products)
    }
    
    useEffect(() => {
      getadded();
    },[])
    

  return (
   <>
   {!addedproducts ? <Loaders/> :
   <div className="product">

{addedproducts.map((item)=> {
  if(item.category=== 'heater'){
    return(
      <motion.div  initial={{opacity:0}} animate={{opacity:1}} className="product-card" >
  <img  src={item.image.url} alt={item.title}/>
  <p>{item.title}</p>
  <button className="btn bg-dark"><Link className="text-white" to={`/api/products/slug/${item.slug}`}>View More</Link></button>
</motion.div>
  )
}
})}

</div>
}
</>
  )
}
