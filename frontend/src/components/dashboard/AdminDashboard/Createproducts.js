import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

export default function Createproducts() {

    const [slug,setslug] = useState('')
    const [image,setimage] = useState('')
    const [title,settitle] = useState('')
    const [Company,setCompany] = useState('')
    const [price,setprice] = useState(0)
    const [category,setcategory] = useState('')
    const [description,setdescription] = useState('')
    const [difficulty,setdifficulty] = useState('')
    const [position,setposition] = useState('')
    const [details,setdetails] = useState([{featureDeatils:''}])
    const [CompanyProductName,setCompanyProductName] = useState('')
     
    const handleImage = (e) => {
      const file = e.target.files[0]
      setFileToBase(file)
      console.log(file)
    }
    
    const setFileToBase = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setimage(reader.result)
      }
    
    }

    const handleAdd = () => {
      setdetails([...details,{featureDetails: ''}])
    }

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
    
 
    
    const submitform = async (e) => {
      e.preventDefault();
    
      axios
      .post('/newproducts/add', {slug,difficulty,position,title,CompanyProductName,details,Company,description,image,price,category})
      .then(() => {
        setslug('')
        settitle('')
        setCompany('')
        setprice(0)
        setdifficulty('')
        setposition('')
        setimage('')
        setdetails([{featureDetails:''}])        
        setdescription('')
        setcategory('')
        setCompanyProductName('')
        toast.success('product added successfully')
        setTimeout(function() {
          window.location.reload();
        },1500)
      })
      .catch((err) => alert(err))
      
    }
 

  return (
    <div className="p-2 text-center">

    <h5>Slug</h5>
    <input type="text" value={slug} onChange={(e) => setslug(e.target.value)}/>

    <h5>Image</h5>
    <input  onChange={handleImage} type="file"/>

    

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

</div>

    <h5>Company-ProductName</h5>
    <input type="text" value={CompanyProductName} onChange={(e) => setCompanyProductName(e.target.value)}/>


    <h5>Title</h5>
    <input type="text" value={title} onChange={(e) => settitle(e.target.value)}/>



    <h5>Company</h5>
    <input type="textarea" value={Company} onChange={(e) => setCompany(e.target.value)}/>

    <h5>Price</h5>
    <input type="text" value={price} onChange={(e) => setprice(e.target.value)}/>

  <h5>Difficulty</h5>
    <input type="text" value={difficulty} onChange={(e) => setdifficulty(e.target.value)}/>

  <h5>Position</h5>
    <input type="text" value={position} onChange={(e) => setposition(e.target.value)}/>

    <h5>Category</h5>
    <input type="text" value={category} onChange={(e) => setcategory(e.target.value)}/>

    <br></br>

    <button type="submit" onClick={submitform} className="px-2 py-1 m-2 bg-primary border-0 rounded-1">Create Upload</button>

</div>
  )
}
