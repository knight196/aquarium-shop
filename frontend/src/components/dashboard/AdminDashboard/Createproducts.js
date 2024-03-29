import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {useMutation} from '@apollo/client'
import {addProducts} from '../../GraphQLData/Newproducts'
import {GetProducts} from '../../GraphQLData/GetProducts'
import {singleImage,multipleImages} from './UploadlistFile/UploadImages'

export default function Createproducts() {

    const [slug,setslug] = useState('')
    const [image,setimage] = useState('')
    const [title,settitle] = useState('')
    const [Company,setCompany] = useState('')
    const [quantity,setquantity] = useState(0)
    const [price,setprice] = useState(0)
    const [category,setcategory] = useState('')
    const [description,setdescription] = useState('')
    const [difficulty,setdifficulty] = useState('')
    const [position,setposition] = useState('')
    const [details,setdetails] = useState([{featureDetails:''}])
    const [CompanyProductName,setCompanyProductName] = useState('')
    const [variants,setvariants] = useState([{packaging:'',price:'',quantity:'' }])
    const [images,setimages] = useState([])
    const [colors,setcolors] = useState([{colors:'',quantity:''}]) 

    const [singleuploaded,setSingleUploaded] = useState('')
    
    const [uploadedimage,setuploadedimages] = useState([])

const [createNewProducts] = useMutation(addProducts,{variables:{
  slug:slug,
  title:title,
  Company:Company,
  quantity:parseInt(quantity),
  price:parseFloat(price),
  category:category,
  description:description,
  difficulty:difficulty,
  position:position,
  CompanyProductName:CompanyProductName,
  details:details,
  variants:variants,
  colors:colors,
  image:{
    url:singleuploaded
  },
  images:uploadedimage
},
refetchQueries:[{query:GetProducts}]
})


    const handleImage = async (e) => {
      e.preventDefault()
      // setFileToBase(file)
      const data = await singleImage(image)
      setSingleUploaded(data.url.toString())
    }
    
    // const setFileToBase = (file) => {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onloadend = () => {
    //     setimage(reader.result)
    //   }
    
    // }

    console.log(singleuploaded)

    const handleAdd = () => {
      setdetails([...details,{featureDetails: ''}])
    }

    // adding plants variants starts here

    const plantsAdd = () => {
      setvariants([...variants,{packaging: '',price:'', quantity:''}])
    }
    const plantshandlechange = (e,index) => {
      const {name,value} = e.target
      const list = [...variants]
      list[index][name] = value;
      setvariants(list)
    }

    const deleteplants = (i) => {
      const deleteVal = [...variants]
      deleteVal.splice(i,1)
      setvariants(deleteVal)
    }

    //end of adding plants variants

    const handlechange = (e,index) => {
      const {name,value} = e.target;
      const list=[...details]
      list[index][name] = value;
      setdetails(list)
    }

    const deletedetails = (i) => {
      const deleteVal = [...details]
      deleteVal.splice(i,1)
      setdetails(deleteVal)
    }
    
    //adding colors
const colorsAdd = () => {
  setcolors([...colors,{colors: '', quantity:0}])
}

const handlecolorchange = (e,index) => {
  const {name,value} = e.target;
  const list=[...colors]
  list[index][name] = value;
  setcolors(list)
}

const deletecolor = (i) => {
  const deleteVal = [...colors]
  deleteVal.splice(i,1)
  setcolors(deleteVal)
}

    const listimages = async (e) => {
      // const files = Array.from(e.target.files)
      e.preventDefault()
      let arr = []

      for(let i=0; i<images.length; i++){
        const data = await multipleImages(images[i])
        arr.push(data)
      }

      setuploadedimages(arr)
      // files.forEach(file => {
      //   const reader = new FileReader();
      //   reader.readAsDataURL(file)
      //   reader.onloadend = () => {
      //     setimages(oldArray => [...oldArray, reader.result])
      //   }
      // })
  }

    
    const submitform = (e) => {
   e.preventDefault()
      // axios.post('/newproduct/newproducts/add', {slug,difficulty,position,title,quantity,CompanyProductName,details,Company,description,image,price,category,variants,images,colors})
      // .then(() => {
      //   setslug('')
      //   settitle('')
      //   setCompany('')
      //   setquantity(0)
      //   setprice(0)
      //   setdifficulty('')
      //   setposition('')
      //   setimage('')
      //   setdetails([{featureDetails:''}])        
      //   setdescription('')
      //   setcategory('')
      //   setCompanyProductName('')
      //   setvariants([{packaging:'', price:'', quantity:''}])
      //   setimages([])
      //   setcolors([{colors:'', quantity:0}])

      createNewProducts({variables:{
        slug:slug,
        title:title,
        Company:Company,
        quantity:parseInt(quantity),
        price:parseFloat(price),
        category:category,
        description:description,
        difficulty:difficulty,
        position:position,
        CompanyProductName:CompanyProductName,
        details:details,
        variants:variants,
        colors:colors,  
        image:{
          url:singleuploaded
        },
        images:uploadedimage
      }})
       
        toast.success('product added successfully')
        setTimeout(function() {
          window.location.reload();
        },1500)

    }

 

  return (
    <div className="p-2 text-center">

    <h5>Slug (required)</h5>
    <input type="text" value={slug} onChange={(e) => setslug(e.target.value)}/>

<form onSubmit={handleImage}>
    <h5>Image</h5>
    <input  onChange={e=> setimage(e.target.files[0])} type="file"/>
    <button type="submit">Upload</button>
</form>

<form onSubmit={listimages}>
<h5>Variants Images</h5>
<input type="file" onChange={e=> setimages(e.target.files)}  multiple/>
<button type="submit">Upload</button>
</form>
    

<h5>Description</h5>
    <textarea className="w-100" style={{height:'200px'}} type="text" value={description} onChange={(e) => setdescription(e.target.value)}/>

<h5>Features&Details</h5>

<div className="d-flex flex-column align-items-center">

<button className="px-3 py-1 border-0 bg-primary m-1 rounded-1" onClick={()=>handleAdd()}>Add</button>
{details.map((x,i)=> (
  <>
<textarea type="text" className="w-50"  name='featureDetails' placeholder="details" onChange={e=> handlechange(e,i)}/>
{details.length!==1 &&
  <button onClick={()=> deletedetails(i)}>Remove</button>
}
</>
))}

<div className="d-flex flex-column align-items-center">

<h5>Plants variants</h5>
<button className="px-3 py-1 border-0 bg-primary m-1 rounded-1" onClick={()=>plantsAdd()}>Add</button>
<br></br>
{variants.map((x,i) => (
  <>
  <input type="text" name="packaging" placeholder="packaging" onChange={e=> plantshandlechange(e,i)}/>
  <input type="text" name="price" placeholder="price" onChange={e=> plantshandlechange(e,i)} className="my-1"/>
  <input type="text" name="quantity" placeholder="quantity" onChange={e=> plantshandlechange(e,i)}/>
  {variants.length!== 1 && <button onClick={()=> deleteplants(i)}>Remove</button>}
  </>
))}
</div>

<div className="d-flex flex-column align-items-center">

<h5>Color variants</h5>
<button className="px-3 py-1 border-0 bg-primary m-1 rounded-1" onClick={()=>colorsAdd()}>Add</button>
<br></br>
{colors.map((x,i) => (
  <>
  <input type="text" name="colors" placeholder="color" onChange={e=> handlecolorchange(e,i)}/>
  <input type="text" name="quantity" placeholder="quantity" onChange={e=> handlecolorchange(e,i)}/>
  {colors.length!== 1 && <button onClick={()=> deletecolor(i)}>Remove</button>}
  </>
))}
</div>



</div>

    <h5>Company-ProductName</h5>
    <input type="text" value={CompanyProductName} onChange={(e) => setCompanyProductName(e.target.value)}/>


    <h5>Title</h5>
    <input type="text" value={title} onChange={(e) => settitle(e.target.value)}/>



    <h5>Company</h5>
    <input type="textarea" value={Company} onChange={(e) => setCompany(e.target.value)}/>

  <h5>Quantity</h5>
  <input type="text" value={quantity} onChange={(e) => setquantity(e.target.value)}/>

    <h5>Price</h5>
    <input type="text" value={price} onChange={(e) => setprice(e.target.value)}/>

  <h5>Difficulty</h5>
    <input type="text" value={difficulty} onChange={(e) => setdifficulty(e.target.value)}/>

  <h5>Position</h5>
    <input type="text" value={position} onChange={(e) => setposition(e.target.value)}/>

    <h5>Category (required)</h5>
    <input type="text" value={category} onChange={(e) => setcategory(e.target.value)}/>

    <br></br>

    <button type="submit" onClick={submitform} className="px-2 py-1 m-2 bg-primary border-0 rounded-1">Create Upload</button>

</div>
  )
}
