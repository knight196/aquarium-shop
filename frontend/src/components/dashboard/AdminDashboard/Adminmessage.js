import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useStateValue} from '../../../StateProvider'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

export default function Adminmessage() {

const [{user},dispatch] = useStateValue();

const [usermsg,setusermsg] = useState([])

const getusermsg = async () => {
const res = await axios.get('/api/adminmessage')
setusermsg(res.data.adminmsg)
}


const deletemsg= async (id) => {
   await axios.delete(`/api/adminmessage/${id}`)
  toast.success('You message has been deleted')
  setTimeout(function (){
    window.location.href="/admin/dashboard"
   },1500)
}


  useEffect(()=> {
    getusermsg();
  },[])

  return (
    <div className="text-center">
      {usermsg.map((item)=> (
        <div className="d-flex my-1 py-1 justify-content-between align-items-center bg-white bg-opacity-50 p-2">
          <Link to={!item.order_id ? `/api/addcontactmsg/_id/${item._id}` : `/api/orders/_id/${item.order_id}`}>
        <p>{item.username} : {item.message}</p>
          </Link>
          <button className="bg-danger btn" onClick={()=> deletemsg(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
