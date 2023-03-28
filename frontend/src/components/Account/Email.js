import {useState,useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

export default function Email() {

  const [email,setemail] = useState('')


  const [signedemail,setSignedEmail] = useState([])

  const getverified = async () => {

    const res = await axios.get(`/orders/useremail/${email}`)
    setSignedEmail(res.data)
  }

  useEffect(() => {
    getverified()
  },[email])

 
  
  const emailaddress = async (e) => {
    
    e.preventDefault()
  
      axios.post('/emailPassword', {id:signedemail._id,email})
      toast.success('Your password reset link has been sent')
    
    
  }



  return (
    <div className="d-flex text-center vh-100 justify-content-center align-items-center flex-column">
      <div className="bg-secondary bg-opacity-50 w-50 h-50 d-flex justify-content-center align-items-center flex-column p-2">
      <p>Enter your email address for new Password</p>
      <input type="email" placeholder="Email address" value={email} onChange={(e)=> setemail(e.target.value)} className="p-2 py-1"/>
      <button className="border-0 px-2 py-1 my-1" onClick={emailaddress}>Confirm</button>
      </div>
    </div>
  )
}
