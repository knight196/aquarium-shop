import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'

import Loaders from '../../Loaders'

export default function Lighting() {

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
    <>
    <motion.div  initial={{opacity:0}} animate={{opacity:1}} className="product">

    <div className="product-card">
     <img className="img-fluid" src="https://twinstareu.com/wp-content/uploads/2022/01/C-LINE-III-LED-reflection-min.jpg" alt="c-line"></img>
     <br></br>
     <p>Affordable aquarium LED light solution with buit-in dimmer for beginning planted aquariums. This is perfect for those who prefer lower maintenance planted tanks and beginners.</p>
     <button className="btn"><Link to="/twinstar-c">Twinstar-C</Link></button>
    </div>

    <div className="product-card">
     <img className="img-fluid" src="https://twinstareu.com/wp-content/uploads/2019/09/E_Line_background_m_c.jpg" alt="twinstar-e"></img>
     <br></br>
     <p>The original and most popular planted aquarium LED light solution that provides all-around brightness and vibrancy. This fixture can practically grow a large majority of low to high light-loving aquatic plants.</p>
     <button className="btn"><Link to="/twinstar-e">Twinstar-E</Link></button>
    </div>

    <div className="product-card">
     <img className="img-fluid" src="https://twinstareu.com/wp-content/uploads/2019/09/S_Line_background_m_c.jpg" alt="twinstar-s"></img>
     <br></br>
     <p>Premium aquarium LED light solution for those who are looking grow the most demanding plants in the hobby. The biggest differentiating factor aside from its bright output are its unique full metal legs.</p>
     <button className="btn"><Link to="/twinstar-s">Twinstar-S</Link></button>
    </div>
    
    </motion.div>


    <div className="product">

{addedproducts.map((item)=> {
  if(item.CompanyProductName=== 'other-lighting'){
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

    </>
: <Loaders/>
  }
  </>

  )
}
