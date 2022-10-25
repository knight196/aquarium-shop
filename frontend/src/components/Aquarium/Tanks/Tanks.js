import React from 'react'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'

export default function Tanks() {
  return (
    <motion.div  initial={{opacity:0}} animate={{opacity:1}} className="product">
     
    <div className="product-card">
     <img className="img-fluid" src="https://www.oase.com/_Resources/Shared/FOT/PRD/FREI/FRRE/all/jpeg/FOT_PRD_FREI_FRRE_70172-HighLine200l-Weiss-002.webp" alt="oase-highline"></img>
     <br></br>
     <button className="btn"><Link to="/oase">Oase</Link></button>
    </div>
    
    <div className="product-card">
     <img className="img-fluid" src="https://www.swelluk.com/media/catalog/product/cache/bc8777b17f623064fe2857c85a7263c9/e/a/ea-freshwater-900-front-matt-cream.jpg" alt="d&d"></img>
     <br></br>
     <button className="btn"><Link to="/d&d">D&D</Link></button>
    </div>

    <div className="product-card">
<img className="img-fluid" src="https://i.ebayimg.com/images/g/M2QAAOSwp7taW040/s-l500.jpg" alt="nano-tanks"/>
<br></br>
<button className="btn"><Link to="/nano">Nano Tank</Link></button>
    </div>

</motion.div>
  )
}
