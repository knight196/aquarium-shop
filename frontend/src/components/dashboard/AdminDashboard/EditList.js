import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'

export default function EditList() {

  const {slug} = useParams()

  const [products,setproducts] = useState([])
  
  const getproducts = async () => {

    const res = await axios.get(`/api/editProduct/${slug}`)

    setproducts(res.data)

  }

  useEffect(() => {
    getproducts()
  },[])

  const [slugName,setslugName] = useState('')
    const [title,settitle] = useState('')
    const [price,setprice] = useState(0)
    const [description,setdescription] = useState('')
    const [details,setdetails] = useState([{featureDetails:products.featureDetails}])
    const [variants,setvariants] = useState([{packaging:'',price:'',quantity:'' }])
    const [colors,setcolors] = useState([{colors:''}]) 

  console.log(products)


const submitform = async (e) => {
  e.preventDefault();

  axios.put('/updateItem', {slugName,title,details,description,price,variants,colors})
  .then(() => {
    setslugName('')
    settitle('')
    setprice(0)
    setdetails([{featureDetails:''}])        
    setdescription('')
    setvariants([{packaging:'', price:'', quantity:''}])
    setcolors([{colors:''}])
   
    toast.success('product added successfully')
    setTimeout(function() {
      window.location.reload();
    },1500)
  })
  .catch((err) => alert(err))
  
}



 

  return (
    <div className="text-center py-2">
      
      <p>Slug</p>
      <input type="text"/>

      <p>Description</p>
      <textarea  style={{width:'700px',height:'300px'}}/>

      <h5>Features&Details</h5>

<div className="d-flex flex-column align-items-center">

<h5>Plants variants</h5>
<br></br>
{products.variants?.map(item => (
  <>
  <input type="text" className="my-1" value={item.packaging} placeholder="packaging"/>
  <input type="text" className="my-1" value={item.price} placeholder="price"/>
  <input type="text" className="my-1" value={item.quantity} placeholder="quantity"/>
  </>
))}
</div>

<div className="d-flex flex-column align-items-center">

<h5>Color variants</h5>

{products.colors?.map(item => (
  <input type="text" className="my-1" value={item.colors} placeholder="colors"/> 
))}
</div>

      <p>Title</p>
      <input type="text"/>

      <p>Price</p>
      <input type="number" />

    

 
      <br></br>

      <button className="px-2 py-1 border-0 my-2" onClick={submitform}>Update</button>


    </div>
  )
}
