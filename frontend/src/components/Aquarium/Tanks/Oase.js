import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'

export default function Oase() {

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
        if(item.CompanyProductName === 'Oase-tank'){
          return(
            <motion.div  initial={{opacity:0}} animate={{opacity:1}} className="product-card">
        <img src={item.image.url} alt={item.title}/>
        <p>{item.title}</p>
        <button className="btn bg-dark text-white"><Link className="text-white" to={`/api/tanks/slug/${item.slug}`}>View More</Link></button>
      </motion.div>
        )
      }
      })}
    </div>
  )
}
