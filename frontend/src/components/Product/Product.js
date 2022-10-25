import React from 'react'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'

export default function Product() {
  return (
    <motion.div  initial={{opacity:0}} animate={{opacity:1}} className="product">
     
     <div className="product-card">
      <img className="img-fluid" src="https://www.aquasabi.de/vcdn/images/dynamic/adaptive/5b9YKMMRlp/naturaquarium-takashi-amano.jpg" alt="tanks"></img>
      <br></br>
      <button className="btn"><Link to="/Tanks">Tanks</Link></button>
     </div>

     <div className="product-card">
<img className="img-fluid" src="https://www.fishkeeper.co.uk/pub/media/catalog/product/o/a/oase_biomaster_all.jpg" alt="filter"/>
<br></br>
<button className="btn"><Link to="/filter">Filter</Link></button>
     </div>

     <div className="product-card">
     <img className="img-fluid" src="https://www.aquasabi.com/media/image/product/27669/lg/twinstar-led-light-iii-sp.jpg" alt="lighting"/>
<br></br>
<button className="btn"><Link to="/lighting">Lighting</Link></button>
     </div>

     <div className="product-card">
    <img src="https://m.media-amazon.com/images/I/71z7RFtdkvL._AC_SL1500_.jpg" alt="soil"/>
    <br></br>
    <button className="btn"><Link to="/soil">Soil & Substrate</Link></button>
     </div>

     <div className="product-card">
    <img src="https://storefeederimages.blob.core.windows.net/realaquaticsltd/Products/542c33dc-abf7-4ab8-bc41-d33220f3205b/Full/pgrwhqnpcs0.jpg" alt="co2"/>
    <br></br>
    <button className="btn"><Link to="/co2">CO2</Link></button>
     </div>

     <div className="product-card">
    <img src="https://azure.wgp-cdn.co.uk/app-practicalfishkeeping/gear/515aaeea77cfc.jpg?&format=webp&webp.quality=40&scale=both" alt="fertiliser"/>
    <br></br>
    <button className="btn"><Link to="/fertiliser">Plant Fertiliser</Link></button>
     </div>

     <div className="product-card">
    <img src="https://www.azaqua.nl/img/cms/hardscape-aquascaping.jpg" alt="ornaments"/>
    <br></br>
    <button className="btn"><Link to="/woodsrocks">Hardscaping</Link></button>
     </div>

     <div className="product-card">
    <img src="https://cdn.shopify.com/s/files/1/0106/2882/5135/products/CA-IOD-SS-S.jpg?v=1615454605" alt="co2 diffuser"/>
    <br></br>
    <button className="btn"><Link to="/other">Other</Link></button>
     </div>

    </motion.div>
  )
}
