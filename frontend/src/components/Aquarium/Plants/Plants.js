import React from 'react'
import {Link} from 'react-router-dom'
import './Plants.css'
import {motion} from 'framer-motion'

export default function Plants() {
  return (
    <motion.div  initial={{opacity:0}} animate={{opacity:1}} className="product">

      <div className="product-card">
    <img src="https://storefeederimages.blob.core.windows.net/realaquaticsltd/Products/35d46c7b-a3ab-415e-b818-e527a968ece2/Full/khpy4qymvfo.jpg" alt="foreground"/>
    <br></br>
    <button className="btn"><Link to="/foreground">FOREGROUND</Link></button>
     </div>

     <div className="product-card">
    <img src="https://i.ebayimg.com/images/g/~gcAAOSwNVxdTxPS/s-l500.jpg" alt="midground"/>
    <br></br>
    <button className="btn"><Link to="/midground">MIDGROUND</Link></button>
     </div>

     <div className="product-card">
    <img src="https://m.media-amazon.com/images/I/612N4MDFVEL._AC_.jpg" alt="background"/>
    <br></br>
    <button className="btn"><Link to="/background">BACKGROUND</Link></button>
     </div>

    </motion.div>
  )
}
