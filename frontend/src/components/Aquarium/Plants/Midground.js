import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import UpdatedComponent from '../../HOC'

function Midground({selectedBrand,handleBrandChange,filteredlist}) {

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

  </select>

    <div className="product">
    {filteredlist.map((item)=> {
if(item.position=== 'Midground'){
return(
<motion.div initial={{opacity:0}} animate={{opacity:1}} className="product-card" >
<img  src={item.image.url} alt={item.title}/>
<p>{item.title}</p>
<button className="btn bg-dark"><Link className="text-white" to={`/api/products/slug/${item.slug}`}>View More</Link></button>
</motion.div>
)
}
})}
</div>
</>
  )
}
 export default UpdatedComponent(Midground)