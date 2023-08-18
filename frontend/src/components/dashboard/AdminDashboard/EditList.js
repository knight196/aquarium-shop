import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import {useQuery,useMutation} from '@apollo/client'
import {GetProducts,singleProduct} from '../../GraphQLData/GetProducts'
import {updateProduct} from '../../GraphQLData/Mutation'
import { updateSingleImage,updateMultipleImages } from './UploadlistFile/UploadImages'

export default function EditList() {

  const {slug} = useParams()

  const {data} = useQuery(singleProduct, {variables:{slug:slug}})
  


  const [slugName,setslugName] = useState('')
    const [title,settitle] = useState('')
    const [price,setprice] = useState(0)
    const [quantity,setquantity] = useState(0)
    const [description,setdescription] = useState('')
    const [details,setdetails] = useState([])
    const [variants,setvariants] = useState([])
    const [colors,setcolors] = useState([]) 
    
    const [image,setimage] = useState('')
    
const [images,setimages] = useState([])

const [singleuploaded,setSingleUploaded] = useState('')

const [multipleimages,setmultipleimages] = useState([])

  const [updateMutation] = useMutation(updateProduct, {
    variables:{
      slug:slugName,
      title:title,
      description:description,
      price:price.toString(),
      quantity:quantity.toString(),
      details:details,
      variants:variants,
      colors:colors,
      image:{
        url:!singleuploaded ?  image : singleuploaded
      },
      images:multipleimages.length === 0 ? images : multipleimages
    }, 
  refetchQueries:[{query:GetProducts}]})


  const getproducts = async () => {
    const res = await axios.get(`/product/editProduct/${slug}`)
     setslugName(res.data.slug)
    settitle(res.data.title)
    setprice(res.data.price)
    setquantity(res.data.quantity)
    setdescription(res.data.description)
    setdetails(res.data.details)
    setvariants(res.data.variants)
    setcolors(res.data.colors)
    setimage(res.data.image.url)
    setimages(res.data.images)
    // if(data){
    //   setslugName(data.product.slug)
    //   settitle(data.product.title)
    // setprice(data.product.price)
    // setquantity(data.product.quantity)
    // setdescription(data.product.description)
    // setdetails(data.product.details)
    // setvariants(data.product.variants)
    // setcolors(data.product.colors)
    // setimage(data.product.image.url)
    // setimages(data.product.images.map(item => item.url))
    // }
  }

  useEffect(() => {
    getproducts()
  },[])




  const handleImage = async (e) => {
    e.preventDefault()
    // const file = e.target.files[0]
    // setFileToBase(file)
    const data = await updateSingleImage(image)
    setSingleUploaded(data.url.toString())
  }

  const listimages = async(e) => {
    e.preventDefault()
  // const files = Array.from(e.target.files)
  // files.forEach(file => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file)
  //   reader.onloadend = () => {
  //     setimages(oldArray => [...oldArray, reader.result])
  //   }
  // })
  let arr = []

  for(let i=0; i<multipleimages.length; i++){
      const data = await updateMultipleImages(multipleimages[i])
      arr.push(data)
  }

  setmultipleimages(arr)
}


  // const setFileToBase = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setimage(reader.result)
  //   }
  // }

// const updateImages = images.slice(4)

const submitform =  (e) => {
//  await axios.put(`/newproduct/updateItem/${slug}`, {
//   slugName,description,price,quantity,title,colors,variants,details,image,images,updateImages
//  })

updateMutation()


    toast.success('product updated successfully')
      setTimeout(function() {
        window.location.reload()
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
  const {name,value} = e.target
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

      <hr></hr>
      <h5>Image</h5>
      <form onSubmit={handleImage}>
    <input  onChange={e=> setimage(e.target.files[0])} type="file" />
    <button type="submit">Upload</button>
      </form>
    <br></br>
    <img style={{width:'100px', height:'100px'}} src={image} alt={title}/>

<hr></hr>

<h5>Variants Images</h5>
<form onSubmit={listimages}>

<input type="file" onChange={e=> setmultipleimages(e.target.files)} multiple/>
  <br></br>
  <button>Upload</button>
  </form>
{images?.map(item => (
  
  <img style={{width:'100px', height:'100px'}} src={item.url} alt={title}/>
  
  ))}

<hr></hr>

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
  <>
  <input type="text" name="colors" className="my-1" value={item.colors} placeholder="colors" onChange={e=> handlecolorchange(e,index)}/> 
  <input type="text" name="quantity" className="my-1" value={item.quantity} placeholder="quantity" onChange={e=> handlecolorchange(e,index)}/> 
  </>
))}
</div>

      <p>Title</p>
      <input type="text" value={title} onChange={e=> settitle(e.target.value)}/>

      <p>Price</p>
      <input type="number" value={price} onChange={e=> setprice(e.target.value)}/>
     
      <p>Quantity</p>
      <input type="number" value={quantity} onChange={e=> setquantity(e.target.value)}/>

    

 
      <br></br>

      <button className="px-2 py-1 border-0 my-2" onClick={submitform}>Update</button>


    </div>
  )
}
