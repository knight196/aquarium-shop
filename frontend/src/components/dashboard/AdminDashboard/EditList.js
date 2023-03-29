import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'

export default function EditList() {

  const {slug} = useParams()


  const [slugName,setslugName] = useState('')
    const [title,settitle] = useState('')
    const [price,setprice] = useState(0)
    const [description,setdescription] = useState('')
    const [details,setdetails] = useState([])
    const [variants,setvariants] = useState([])
    const [colors,setcolors] = useState([]) 
   
 

  
  const getproducts = async () => {

    const res = await axios.get(`/api/editProduct/${slug}`)
    setslugName(res.data.slug)
    settitle(res.data.title)
    setprice(res.data.price)
    setdescription(res.data.description)
    setdetails(res.data.details)
    setvariants(res.data.variants)
    setcolors(res.data.colors)
 
  }

  useEffect(() => {
    getproducts()
  },[])




const submitform = async (e) => {
  e.preventDefault();
  
 await axios.put(`/updateItem/${slug}`, {
    slugName,
    title,
    price,
    description,
    details,
    variants,
    colors,
  })

//   public_id: "aquariumShop/c8pggarrossv8uvtccoo"
// ​​
// url: "https://res.cloudinary.com/personal-use-only/image/upload/v1677169914/aquariumShop/c8pggarrossv8uvtccoo.jpg"


    toast.success('product updated successfully')
      setTimeout(function() {
        window.location.href(`/api/editProduct/${slug}`);
      },1500)
      .catch((err) => alert(err))
    
  
}

const handlecolorchange = (e,index) => {
  const {name,value} = e.target;
  const list=[...colors]
  list[index][name] = value;
  setcolors(list)
}

const plantshandlechange = (e,index) => {
  const {name,value} = e.target.value
  const list = [...variants]
  list[index][name] = value;
  setvariants(list)
}


const handlechange = (e,index) => {
  const {name,value} = e.target;
  const list=[...details]
  list[index][name] = value;
  setdetails(list)
}




  return (
    <div className="text-center py-2">
      
      <p>Slug</p>
      <input type="text" value={slugName} onChange={e=> setslugName(e.target.value)}/>



      <p>Description</p>
      <textarea className="w-100" style={{height:'200px'}} value={description} onChange={e=> setdescription(e.target.value)}/>

      <h5>Features&Details</h5>

      {details?.map((item,index) => (
        <div>
        <input type="text" name="featureDetails" value={item.featureDetails} className="my-1 w-50 h-50" onChange={e=> handlechange(e,index)}/>
        </div>
      ))}

<div className="d-flex flex-column align-items-center">

<h5>Plants variants</h5>
<br></br>
{variants?.map((item,index) => (
  <>
  <input type="text" name="packaging" className="my-1" value={item.packaging} onChange={e=> plantshandlechange(e,index)} placeholder="packaging"/>
  <input type="text" name="price" className="my-1" value={item.price} placeholder="price" onChange={e=> plantshandlechange(e,index)}/>
  <input type="text" name="quantity" className="my-1" value={item.quantity} placeholder="quantity" onChange={e=> plantshandlechange(e,index)}/>
  </>
))}
</div>

<div className="d-flex flex-column align-items-center">

<h5>Color variants</h5>

{colors?.map((item,index) => (
  <input type="text" name="colors" className="my-1" value={item.colors} placeholder="colors" onChange={e=> handlecolorchange(e,index)}/> 
))}
</div>

      <p>Title</p>
      <input type="text" value={title} onChange={e=> settitle(e.target.value)}/>

      <p>Price</p>
      <input type="number" value={price} onChange={e=> setprice(e.target.value)}/>

    

 
      <br></br>

      <button className="px-2 py-1 border-0 my-2" onClick={submitform}>Update</button>


    </div>
  )
}
