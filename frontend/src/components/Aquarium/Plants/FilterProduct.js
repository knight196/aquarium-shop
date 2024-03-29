import React from 'react'

export default function FilterProduct({plantdifficulty,addedproducts,handleBrandChange,handleChange,handleInput,price,highPrice,lowPrice}) {
  
const checkedlist = addedproducts.map(item => item.difficulty)
.filter((v,i,a) => a.indexOf(v) === i)
.filter(Boolean)

  return (
    <div>
      <div className="filter-selection p-2 h-100">

<select
id="brand-input"
value={plantdifficulty}
onChange={handleBrandChange}
>
<option value="">All</option>
<option value="Easy">Easy</option>
<option value="Medium">Medium</option>
<option value="Advanced">Advanced</option>

</select>

<hr></hr>

{checkedlist.map(item => 
  <>
  <input  className="input-check" type="checkbox" onChange={handleChange} label={item} value={item}/> 
<label className="mx-1">{item}</label>
  </>
  )}

<hr></hr>

<input type="range" max="6" onChange={handleInput}/>

<p>£ {price}</p>

<hr></hr>

<div className="my-1">

<p>Sort Price</p>
 <button onClick={()=>highPrice('price')} className="border-0 px-2 m-1">Price: High - Low</button>
 <button onClick={()=>lowPrice('price')}className="border-0 px-2 m-1">Price: Low - High</button>

</div>
</div>
    </div>
  )
}
