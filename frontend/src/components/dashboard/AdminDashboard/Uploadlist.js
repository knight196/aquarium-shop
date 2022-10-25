import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Uploadlist() {

const [uploadlist,setuploadlist] = useState([])

const [filteredlist,setfilteredlist] = useState([])


const fetchData = async () => {
    const res = await axios.get('/api/newproducts')
    setfilteredlist(res.data.newproducts)
}


const filteredata = async () => {
  const res = await axios.get('/api/newproducts')
  setuploadlist(res.data.newproducts)
}

const deletelist = async (id) => {
 await axios.delete(`/api/${id}`)
 toast.success('Your product has been deleted successfully')
 setTimeout(function (){
  window.location.reload()
 },1500)
}

useEffect(()=> {
fetchData()
deletelist()
filteredata();
},[])

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
    <option value="Lighting">Lighting</option>
    <option value="Filter">Filter</option>
    <option value="fertiliser">Fertiliser</option>
    <option value="hardscaping">Hardscaping</option>
    <option value="other">Other</option>
    <option value="plants">Plants</option>

  </select>
      {filteredlist.map((item)=> (
        <div className="uploadproduct d-flex justify-content-between align-items-center bg-secondary my-2 p-2">
        <img style={{width:'100px',height:'100px'}} src={item.image.url} alt=""/>
        <p>{item.title}</p>
        <div>
            <p5>CreatedAt</p5>
        <p>{item.createdAt.substring(0,10)}</p>
        <button onClick={()=> deletelist(item._id)} style={{fontSize:'10px'}} className="btn w-100 bg-danger text-white">Delete</button>
        </div>
        </div>
      ))}
    </div>
  )
}
