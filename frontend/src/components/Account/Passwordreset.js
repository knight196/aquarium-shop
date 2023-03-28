import {useEffect,useState} from 'react'
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals'
import { showErrorMsg,showSuccessMsg } from './message'
import {useParams,useNavigate} from 'react-router-dom'
import axios from 'axios'
import {toast}  from 'react-toastify'

export default function Passwordreset() {

  const navigate = useNavigate()

  const {id} = useParams()
  
    const [formData,setFormData] = useState({password:'', password2:'',successMsg:false,errorMsg:false})
    
    const {password,password2,successMsg,errorMsg} = formData

  const emailget = async () => {
await axios.get(`/orders/userresetpwd/${id}`)
  }

  useEffect(() => {
emailget()
  },[])

    function handleChange(e){
      setFormData({
        ...formData,[e.target.name]: e.target.value,
        successMsg:'', errorMsg:''
      })
    }

    const handleSubmit = e => {

      e.preventDefault()

      if(isEmpty(password) || isEmpty(password2)){
        setFormData({
          ...formData, errorMsg:'All fields are required'
        })
      }else if (!equals(password,password2)){
        setFormData({
          ...formData,
          errorMsg: 'Passwords do not match'
        })
      }else{

        axios.put('/orders/passwordreset', {password,id})

        axios.post('/confirmresetPwd', {email: id.email})

        toast.success('Your password was reset successfully')
      
      }

    }

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit} noValidate className="text-center bg-secondary bg-opacity-50 w-50 h-50 p-2 d-flex flex-column justify-content-center align-items-center">
      {successMsg && showSuccessMsg(successMsg)}
					{errorMsg && showErrorMsg(errorMsg)}

    <p>New Password</p>
    <input type="password" value={password} name="password" onChange={handleChange} placeholder='Enter your New Password' className="px-2 py-1"/>

    <p>Confirm Password</p>
    <input type="password" name="password2" value={password2} onChange={handleChange} placeholder="Confirm new password" className="px-2 py-1"/>

<br></br>
<button className="border-0 px-2 py-1 my-1">Confirm</button>

      </form>
    </div>
  )
}