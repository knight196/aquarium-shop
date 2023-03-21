import {useEffect,useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

function UpdatedComponent(OriginalComponent) {
  
    function NewComponent(){
        const [addedproducts,setaddedproducts] = useState([])
        const [filteredlist,setfilteredlist] = useState([])

        const [loading,setloading] = useState(false)
    
        const getadded = async () => {
          const res = await axios.get('/api/products')
          setfilteredlist(res.data.products)
          setloading(true)
        }
        const filteredata = async () => {
          const res = await axios.get('/api/newproducts')
          setaddedproducts(res.data.newproducts)
        }

       
            
        
        useEffect(() => {
          getadded();
          filteredata();
         
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
    return <OriginalComponent handleBrandChange={handleBrandChange} loading={loading} filteredlist={filteredlist} selectedBrand={selectedBrand}/>    
    }

    return NewComponent
}

export default UpdatedComponent