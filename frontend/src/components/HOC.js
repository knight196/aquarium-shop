import {useEffect,useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

function UpdatedComponent(OriginalComponent) {
  
    function NewComponent(){

      const data =[
        {
          label:'Easy'
        },
        {
          label:'Medium'
        },
        {
          label:'Advanced'
        }
      ]

        const [addedproducts,setaddedproducts] = useState([])
        const [filteredlist,setfilteredlist] = useState([])

        const [item,setProducts] = useState('')


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

    const [price, setPrice] = useState(0)


const handleInput = (e) =>{
  setPrice(e.target.value)
}

    
    // Update seletedBrand state
    const handleBrandChange = (event) => {
      setSelectedBrand(event.target.value);
    };

    const handleChange = e => {

      if(e.target.checked){
        setProducts([...item, e.target.value])
      }else{
        setProducts(item.filter(id => id !== e.target.value))
      }
      
    }

    useEffect(() => {
      if(item.length===0){
        setfilteredlist(addedproducts)
      }else{
        setfilteredlist(addedproducts.filter(x => item.some(category => [x.difficulty].flat().includes(category))))
      }
       }, [item])
    
    useEffect(() => {
      var filteredData = filterByBrand(addedproducts);
      setfilteredlist(filteredData);
    }, [selectedBrand]);

    const [high] = useState('ASC')
    const [low] = useState('DES')
  
    function highPrice(col){
    if(high === 'ASC'){
  const sorted = [...filteredlist].sort((a,b)=>
  a[col] < b[col] ? 1 : -1
  )
  setfilteredlist(sorted)
    }
    }
  
    function lowPrice(col){
    if(low === 'DES'){
  const sorted = [...filteredlist].sort((a,b)=>
  a[col] > b[col] ? 1 : -1
  )
  setfilteredlist(sorted)
    }
    }
  
  

    return <OriginalComponent handleBrandChange={handleBrandChange} handleChange={handleChange} loading={loading} filteredlist={filteredlist} selectedBrand={selectedBrand} handleInput={handleInput} price={price} highPrice={highPrice} lowPrice={lowPrice} data={data}/>    
    }

    return NewComponent
}

export default UpdatedComponent