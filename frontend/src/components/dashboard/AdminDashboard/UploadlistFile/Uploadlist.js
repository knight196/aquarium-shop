import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import {Link} from 'react-router-dom'
import {useQuery} from '@apollo/client'
import {GetProducts} from '../../../GraphQLData/GetProducts'
import Productsdelete from './Productsdelete'


export default function Uploadlist() {
  
  const [uploadlist,setuploadlist] = useState([])
  
  const [filteredlist,setfilteredlist] = useState([])

  const {data} = useQuery(GetProducts)

const fetchData = async () => {
  if(data){
    setfilteredlist(data.products)
  }
}

const filteredata = async () => {
  if(data){
    setuploadlist(data.products)
  }
}

useEffect(()=> {
fetchData()
filteredata();
},[data])

const [selectedBrand, setSelectedBrand] = useState("");

const filterByBrand = (filteredData) => {
  // Avoid filter for empty string
  if (!selectedBrand) {
    return filteredData;
  }

  const filteredCars = filteredData.filter(
    (car) => car.category.split(" ").indexOf(selectedBrand) !== -1
  );
  return filteredCars;
};

// Update seletedBrand state
const handleBrandChange = (event) => {
  setSelectedBrand(event.target.value);
};

useEffect(() => {
  var filteredData = filterByBrand(uploadlist);
  setfilteredlist(filteredData);
}, [selectedBrand]);


return (
    <div>
        <h5 className="text-center">UploadProductList</h5>
        <select
    id="brand-input"
    value={selectedBrand}
    onChange={handleBrandChange}
  >
    <option value="">All</option>
    <option value="Nano-tanks">Nano-tanks</option>
    <option value="Tanks">Tanks</option>
    <option value="Soil">Soil</option>
    <option value="Lighting">Lighting</option>
    <option value="Filter">Filter</option>
    <option value="heater">Heater</option>
    <option value="fertiliser">Fertiliser</option>
    <option value="hardscaping">Hardscaping</option>
    <option value="other">Other</option>
    <option value="Plants">Plants</option>

  </select>
      {filteredlist.map((item)=> (
        <div className="uploadproduct d-flex justify-content-between align-items-center bg-white bg-opacity-50 my-2 p-2">
        <img style={{width:'100px',height:'100px'}} src={item.image.url} alt=""/>
        <p>{item.title}</p>
        <div>
         

<p>{item.quantity === 0 ? <small className="text-danger">Out of Stock</small> : ''}</p>

        <Link to={`/editProduct/${item.slug}`}>
        <button style={{fontSize:'10px'}} className="btn w-100 bg-primary text-white">Edit</button>
        </Link>
      <Productsdelete id={item._id}/>
        </div>
        </div>
      ))}
    </div>
  )
}
