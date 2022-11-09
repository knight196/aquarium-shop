import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'


export default function Nano() {

  const [addedoase,setaddedoase] = useState([])

  const getaddedoase = async () => {
    const res = await axios.get('/api/products')
    setaddedoase(res.data.products)
  }
  
  useEffect(() => {
    getaddedoase();
  },[])

  return (
    <div className="product">
    {addedoase.map((item)=> {
      if(item.category === 'Nano-tanks'){
        return(
          <motion.div  initial={{opacity:0}} animate={{opacity:1}} className="product-card" >
      <img src={item.image.url} alt={item.title}/>
      <p>{item.title}</p>
      <button className="btn bg-dark"><Link className="text-white" to={`/api/products/slug/${item.slug}`}>View More</Link></button>
    </motion.div>
      )
    }
    })}
  </div>
  )
}
