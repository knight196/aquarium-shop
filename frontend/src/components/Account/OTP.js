import React from 'react'
import './Account.css'
import {useParams,Link,useNavigate} from 'react-router-dom'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

export default function OTP() {

  const navigate = useNavigate()

    const [email,setemail] = useState([])

    const [OTPInput,setOTPInput] = useState([0,0,0,0])

    const [timerCount,setTimer] = useState(60)

    const [disable,setDisabled] = useState(true)


    const {id} = useParams()

    const emailget = async () => {
        const res = await axios.get(`/emailproduct/userresetpwd/${id}`)
        setemail(res.data)
          }
        
          useEffect(() => {
        emailget()
          },[])

          const verifyOTP  = () => {

            if(parseInt(OTPInput.join('')) === parseInt(email.OTP)){
            navigate(`/passwordReset/${id}`)
              return
          }

            toast.error('The code you have entered is not correct, try again or re-send the link')

            return
          }

          function resendOTP() {

            const OTP = Math.floor(Math.random() * 9000 + 1000)

            if(disable) return
            axios.put('/emailproduct/OTPCode',{id:id,OTP:OTP})
            axios.post('/emailproduct/emailPassword', {id:id,email:email.email,OTP:OTP})
            .then(() => setDisabled(true))
            .then(() => toast.success('Your new OTP has been sent'))
            .then(() => setTimer(60))
            .catch(console.log)
          }

          useEffect(() => {
            //resend link timer 

            let interval = setInterval(() => {
              setTimer((lastTimerCount) => {
                lastTimerCount <= 1 && clearInterval(interval)
                if(lastTimerCount <= 1) setDisabled(false)
                if(lastTimerCount <= 0) return lastTimerCount;
                return lastTimerCount -1 
              })
            },1000)//each count lasts for a second
            //cleanup the interval on console
            return () => clearInterval(interval)
          },[disable])


  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className="otp-input bg-secondary bg-opacity-50 p-2 h-50  d-flex align-items-center flex-column justify-content-center">
            
            <i className="fas fa-shield-alt bg-primary text-white p-2 rounded-5"></i>
            
            <h5 className="text-center">Enter OTP Code</h5>
            
            <div className="text-center">

        <input maxLength="1" onChange={(e) => setOTPInput([e.target.value,OTPInput[1],OTPInput[2],OTPInput[3]])} type="text"/>
        <input maxLength="1" onChange={(e) => setOTPInput([OTPInput[0],e.target.value,OTPInput[2],OTPInput[3]])} type="text"/>
        <input maxLength="1" onChange={(e) => setOTPInput([OTPInput[0],OTPInput[1],e.target.value,OTPInput[3]])} type="text"/>
        <input maxLength="1" onChange={(e) => setOTPInput([OTPInput[0],OTPInput[1],OTPInput[2],e.target.value])} type="text"/>
            </div>

        <div className="text-center m-2">
        <button onClick={e=> verifyOTP()} className="border-0 rounded-1 px-2 py-1 text-white bg-primary">Verify OTP</button>
        </div>

      <div>
        Didn't receive the code? <small onClick={e => resendOTP()} style={{color:disable ? 'grey' : 'blue', textDecoration:'underline', cursor:'Pointer'}}>{disable ? `Resend OTP in ${timerCount}s` : 'Resend OTP'}</small>
      </div>

        </div>
    </div>
  )
}
