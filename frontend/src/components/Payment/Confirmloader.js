import React from 'react'
import './Payment.css';

export default function Confirmloader({showModal,modal}) {
  return (
    <div className={modal === true ? "loading d-flex" : 'd-none'}>
    <h5>Processing....</h5>
    <button onClick={()=> showModal(false)} className="px-2 py-1 border-0">X</button>
    <video width="20%" height="20%" loop="true" autoplay="true" muted>
      <source src="https://cdn-icons-mp4.flaticon.com/512/8718/8718553.mp4"/>
      </video>    
    </div>
      
  )
}
