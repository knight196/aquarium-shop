import React from 'react'
import { useStateValue } from '../StateProvider'

export default function CheckoutSteps(props) {

  return (
    <div className="d-flex bg-success text-center">
      <div style={{width:'100%', height:'10px'}} className={props.step1 ? 'bg-success' : 'bg-white'}><p className="my-2">Sign In</p></div>
      <div style={{width:'100%', height:'10px'}} className={props.step2 ? 'bg-success' : 'bg-white'}><p className="my-2">Basket</p></div>
      <div style={{width:'100%', height:'10px'}}  className={props.step3 ? 'bg-success' : 'bg-white'}><p className="my-2">Shipping</p></div>
      <div style={{width:'100%', height:'10px'}}  className={props.step4 ? 'bg-success' : 'bg-white'}><p className="my-2">Payment</p></div>
    </div>
  )
}
