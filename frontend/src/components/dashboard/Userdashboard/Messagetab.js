import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useStateValue} from '../../../StateProvider'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

export default function Messagetab() {

  const [{user}, dispatch] = useStateValue();
    
  const [msgupdate,setmsgupdate] = useState([]);

  console.log(msgupdate)

  
  
    const getmessage = async () => {
      const res = await axios.post('/orders/getusermessage', {username:user.username})
      setmsgupdate(res.data)
    }

    const deletelist = async (id) => {
      await axios.delete(`/orders/usermessage/${id}`)
      toast.success('Your message has been deleted successfully')
      setTimeout(function (){
       window.location.href="/user/dashboard"
      },1500)
     }
    
  
    useEffect(() => {
    getmessage();
  },[])
  

  return (
    <div className="text-center">
      <h5>Message</h5>
      {msgupdate.map((msg)=>
            <>
          <div className="d-flex my-1 py-2 bg-white bg-opacity-50 justify-content-between align-items-center px-2">
        <Link to={!msg.orderId ? `/orders/addcontactmsg/_id/${msg._id}` : `/orders/get/_id/${msg.orderId}`}>
          <p>{msg.username} : {msg.message}</p>
        </Link>
        <button className="bg-danger border-0 px-2 btn" onClick={()=> deletelist(msg._id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  )
}
