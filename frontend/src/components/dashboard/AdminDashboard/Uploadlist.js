import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Uploadlist() {

const [uploadlist,setuploadlist] = useState([])

const fetchData = async () => {
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
},[])

  return (
    <div>
        <h5 className="text-center">UploadProductList</h5>
      {uploadlist.map((item)=> (
        <div className="uploadproduct d-flex justify-content-between align-items-center bg-secondary my-2 p-2">
        <img style={{width:'100px',height:'100px'}} src={item.image} alt=""/>
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
