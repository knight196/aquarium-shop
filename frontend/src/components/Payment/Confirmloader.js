import React from 'react'
import './Payment.css';
import {useNavigate} from 'react-router-dom'

export default function Confirmloader() {

  const navigate = useNavigate()
  
  function homescreen(){
    navigate('/')
  }

  return (
    <div className="loading">
      <i className="bi bi-check text-success"></i>
      <p className="my-2">Payment Successful</p>
      <button onClick={homescreen} className="bg-warning px-5 py-2 border-0">OK</button>
    </div>
      
  )
}
