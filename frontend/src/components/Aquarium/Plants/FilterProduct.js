import React from 'react'

export default function FilterProduct({selectedBrand,handleBrandChange,handleChange,handleInput,price,highPrice,lowPrice,data}) {
  return (
    <div>
      <div className="filter-selection p-2 h-100">

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

<hr></hr>

<div>

{data.map(item => (
<>
<input  className="input-check" type="checkbox" onChange={handleChange} label={item.label} value={item.label}/> 
<label className="mx-1">{item.label}</label>
</>
))}  
</div>

<br></br>


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
