import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import Loaders from '../../Loaders'

export default function DD() {

  const [addedoase,setaddedoase] = useState([])

  const getaddedoase = async () => {
    const res = await axios.get('/api/products')
    setaddedoase(res.data.products)
  }
  
  useEffect(() => {
    getaddedoase();
  },[])

  return (

    <>
    {!addedoase ? <Loaders/> :

    <div className="product">
    {addedoase.map((item)=> {
      if(item.CompanyProductName === 'D&D'){
        return(
          <motion.div className="product-card" >
      <img  src={item.image.url} alt={item.title}/>
      <p>{item.title}</p>
      <button className="btn bg-dark"><Link className="text-white" to={`/api/tanks/slug/${item.slug}`}>View More</Link></button>
    </motion.div>
      )
    }
  })}
  </div>
  }
  </>
  )
}
