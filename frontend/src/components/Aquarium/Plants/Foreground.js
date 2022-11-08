import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'

export default function Foreground() {

    const [addedproducts,setaddedproducts] = useState([])
    const [filteredlist,setfilteredlist] = useState([])

    const getadded = async () => {
      const res = await axios.get('/api/products')
      setfilteredlist(res.data.products)
    }
    
const filteredata = async () => {
  const res = await axios.get('/api/newproducts')
  setaddedproducts(res.data.newproducts)
}
    
    useEffect(() => {
      getadded();
      filteredata()
    },[])

    const [selectedBrand, setSelectedBrand] = useState("");

const filterByBrand = (filteredData) => {
  // Avoid filter for empty string
  if (!selectedBrand) {
    return filteredData;
  }

  const filteredCars = filteredData.filter(
    (car) => car.difficulty.split(" ").indexOf(selectedBrand) !== -1
  );
  return filteredCars;
};

// Update seletedBrand state
const handleBrandChange = (event) => {
  setSelectedBrand(event.target.value);
};

useEffect(() => {
  var filteredData = filterByBrand(addedproducts);
  setfilteredlist(filteredData);
}, [selectedBrand]);


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

    <div className="product">
    {filteredlist.map((item)=> {
if(item.position=== 'Foreground'){
return(
<motion.div initial={{opacity:0}} animate={{opacity:1}} className="product-card" >
<img  src={item.image.url} alt={item.title}/>
<p>{item.title}</p>
<button className="btn bg-dark"><Link className="text-white" to={`/api/plants/slug/${item.slug}`}>View More</Link></button>
</motion.div>
)
}
})}
</div>

    </>
  )
}
