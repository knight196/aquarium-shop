import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import UpdatedComponent from '../../HOC'
import Loaders from '../../Loaders'

function Background({selectedBrand,handleBrandChange,filteredlist,loading}) {

  
  
  return (
    <>

<select
    id="brand-input"
    value={selectedBrand}
    onChange={handleBrandChange}
  >
    <option value="">All</option>
    <option value="Easy">Easy</option>
    <option value="Medium">Medium</option>
    <option value="Advanced">Advanced</option>

  </select>


{loading ?  

    <div className="product">
    {filteredlist.map((item,i)=> {
if(item.position=== 'Background'){
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


export default UpdatedComponent(Background)