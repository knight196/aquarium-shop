import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import UpdatedComponent from './HOC'
import Loaders from '../../Loaders'
import './Plants.css'
import FilterProduct from './FilterProduct'

function Foreground({plantdifficulty,handleBrandChange,filteredlist,loading,handleChange,handleInput,price,highPrice,lowPrice,data,addedproducts}) {

  return (

    <>

<div className="filter-data">

<FilterProduct addedproducts={addedproducts} lowPrice={lowPrice} highPrice={highPrice} handleInput={handleInput} handleChange={handleChange} handleBrandChange={handleBrandChange} plantdifficulty={plantdifficulty} price={price}/>

<hr></hr>

  {loading ? 

    <div className="product">
    {filteredlist.filter(item => {return item.price <= parseInt(price)}).map((item)=> {
if(item.position=== 'Foreground'){
return(
<motion.div layout className="product-card" >
<img  src={item.image.url} alt={item.title}/>
<p>{item.title}</p>
<p>£{item.price}</p>
<button className="btn bg-dark"><Link className="text-white" to={`/api/plants/slug/${item.slug}`}>View More</Link></button>
</motion.div>
)
}
})}
</div> : 
<div className="loader">
<Loaders/>
</div>
}
</div>

    </>
  )
}

export default UpdatedComponent(Foreground)