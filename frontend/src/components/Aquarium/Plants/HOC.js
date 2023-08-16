import {useEffect,useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import {useQuery} from '@apollo/client'
import {GetProducts} from '../../GraphQLData/GetProducts'

function UpdatedComponent(OriginalComponent) {
  
    function NewComponent(){

      const {data} = useQuery(GetProducts)

        const [addedproducts,setaddedproducts] = useState([])
        const [filteredlist,setfilteredlist] = useState([])

        const [item,setProducts] = useState('')


        const [loading,setloading] = useState(false)

        const getadded = async () => {
       
          if(data){
            setaddedproducts(data.products)
            setloading(true)
          }
        }
        const filteredata = async () => {
       
          if(data){
            setfilteredlist(data.products)
          }
        }

       
            
        
        useEffect(() => {
          getadded();
          filteredata();
        },[data])
    
        
        const [plantdifficulty, setPlantDifficulty] = useState("");
    
    const filterByBrand = (filteredData) => {
      // Avoid filter for empty string
      if (!plantdifficulty) {
        return filteredData;
      }
    
      const filteredPriceData = filteredData.filter(
        (plant) => plant.difficulty.split(" ").indexOf(plantdifficulty) !== -1
      );
      return filteredPriceData;
    };

    const [price, setPrice] = useState(6)


const handleInput = (e) =>{
  setPrice(e.target.value)
}

    
    // Update seletedBrand state
    const handleBrandChange = (event) => {
      setPlantDifficulty(event.target.value);
    };

    const handleChange = e => {


      if(e.target.checked){
        setProducts([...item, e.target.value])
      }else{
        setProducts(item.filter(item => item !== e.target.value))
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
    }, [plantdifficulty]);

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
  
  

    return <OriginalComponent handleBrandChange={handleBrandChange} handleChange={handleChange} loading={loading} filteredlist={filteredlist} plantdifficulty={plantdifficulty} handleInput={handleInput} price={price} highPrice={highPrice} lowPrice={lowPrice} addedproducts={addedproducts}/>    
    }

    return NewComponent
}

export default UpdatedComponent