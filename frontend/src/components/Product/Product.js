import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import './Product.css'
import axios from 'axios'

export default function Product() {

  const getaddedproducts = async () => {
    const res = await axios.get('/api/products')
    setFilteredList(res.data.products)
  }

  const filterproducts = async () => {
    const res = await axios.get('/api/products')
    setaddedproducts(res.data.products)
  }
   
    useEffect(() => {
      getaddedproducts();
      filterproducts()
    },[])

    
    const [click,setClick] = useState(false)
    const showFilter = () => setClick(!click);
    

    const [filteredList,setFilteredList] = useState([])

   const [addedproducts,setaddedproducts] = useState([])

   // Selected Brand name filter
   const [selectedBrand, setSelectedBrand] = useState('');


   const [item,setProducts] = useState('')

const [price, setPrice] = useState(0)


const handleInput = (e) =>{
  setPrice(e.target.value)
}

   const handleChange = e => {

    if(e.target.checked){
      setProducts([...item, e.target.value])
    }else{
      setProducts(item.filter(id => id !== e.target.value))
    }
    
  }

   React.useEffect(() => {
  if(item.length===0){
    setFilteredList(addedproducts)
  }else{
    setFilteredList(addedproducts.filter(x => item.some(category => [x.title].flat().includes(category))))
  }
   }, [item])
    
   const filterByBrand = (filteredData) => {
    // Avoid filter for empty string
    if (!selectedBrand) {
      return filteredData;
    }
  
    const filteredBrand = filteredData.filter(
      (product) => product.title.split(" ").indexOf(selectedBrand) !== -1
      );
      return filteredBrand;
    };

//   const handleBrandChange = (e) => {
// setSelectedBrand(e.target.value);

// var checkboxes = document.getElementsByClassName('input-check')
// for(var i=0; i<checkboxes.length; i++){
//   checkboxes[i].checked = false;
// }
// setFilteredList([...addedproducts])
//   }

  React.useEffect(() => {
    var filteredData = filterByBrand(addedproducts)
    setFilteredList(filteredData)
  }, [selectedBrand])
  

  

  const [high] = useState('ASC')
  const [low] = useState('DES')

  function highPrice(col){
  if(high === 'ASC'){
const sorted = [...filteredList].sort((a,b)=>
a[col] < b[col] ? 1 : -1
)
setFilteredList(sorted)
  }
  }

  function lowPrice(col){
  if(low === 'DES'){
const sorted = [...filteredList].sort((a,b)=>
a[col] > b[col] ? 1 : -1
)
setFilteredList(sorted)
  }
  }


  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1, transition:{duration:.5}}}>
    <div className="filter-flex">
    <div className="filter bg-primary p-2">

      <div className="custom-select">
   
   <select id="brand-input" className="border-0 p-1" value={selectedBrand} onChange={(e)=>setSelectedBrand(e.target.value)}>
     <option value="">All</option>
     <option value="Google">Google</option>
     <option value="OnePlus">OnePlus</option>
     <option value="Samsung">Samsung</option>
     <option value="Huawei">Huawei</option>
     </select>
   
      <div style={{cursor:'pointer'}} onClick={showFilter} className="text-white filter-icon h6">
        <i className="bi bi-filter h6"></i>
        <span>Filter</span>
      </div>
      </div>

<div style={{position:'absolute',left:'0',zIndex:'1'}} className={click ? "d-show bg-primary  px-3 mt-2 checkboxes" : "d-hide"}>
  <hr></hr>

  <h6 className="text-warning">Brands</h6>
    
  {addedproducts.map((item) => (
       <>
       <input  className="input-check" type="checkbox" onChange={handleChange} label={item.title} value={item.title}/> 
       <label className="mx-1">{item.Company}</label>
       </>
     ))}
     <hr></hr>
     <h6 className="text-warning">Price</h6>
<input type="range" max="1500" onInput={handleInput}/>
<p>£{price}</p>
<hr></hr>

<div className="my-1">

  <p className="text-warning">Sort Price</p>
        <button onClick={()=>highPrice('price')} className="border-0 px-2 m-1">Price: High - Low</button>
        <button onClick={()=>lowPrice('price')}className="border-0 px-2 m-1">Price: Low - High</button>

</div>

     </div>



</div>
  
<motion.div initial={{opacity:0}} animate={{opacity:1, transition:{duration:1.5}}} className="text-center py-4 phone-product">
{filteredList.filter((productItem,index) => {return productItem.price > parseInt(price, 10)}).map((productItem) =>  (
  <motion.div initial={{opacity:0}} animate={{opacity:1, transition:{duration:1}}} layout className="imggrid card" key={productItem.slug} >
            <img className="img-fluid" src={productItem.image} alt={productItem.image}/>
            <p> {productItem.title}</p>
            <p>£ {productItem.price}</p>
            <button className="bg-primary rounded-1 text-white"  key={productItem.slug}> <Link className="text-white"  to={`/api/products/slug/${productItem.slug}`}>View More</Link></button>
            </motion.div>
)
)}


</motion.div>

</div>
    </motion.div>
  )
}
