// import { Button,Descriptions } from 'antd';
import React, {useEffect, useState} from 'react';
// import styled from "styled-components";
import { useStateValue } from '../../../StateProvider';
import {Link,useNavigate} from "react-router-dom";
import {motion} from 'framer-motion'
import SelectorButton from './SelectorButton';
import './Tanks.css'
import axios from 'axios'
import { toast } from 'react-toastify'
// import { useAlert } from 'react-alert';

function TanksInfo(props) {

  const [Product, setProduct] = useState([])
  
    const [{basket},dispatch]=useStateValue();

let navigate = useNavigate();

useEffect(()=>{
  setProduct(props.detail)
}, [props.detail])  



const [toggleState, setToggleState] = useState(0)

const toggleTab = (index) => {
  setToggleState(index)
}


const [colorlist,setcolorlist] = useState([])

const [colorqty,setquantity] = useState([])

const [selectedcolor,setselectedcolor] = useState('')

const [id,setid] = useState('')

useEffect(() => {

  const color = Product.colors?.map(item => item.colors)
      .filter((v, i, a) => a.indexOf(v) === i)
      setcolorlist(color)

  const qty = Product.colors?.filter(item => item.colors === selectedcolor)
      .map(item => item.quantity)
      setquantity(qty)


  const productId = Product.colors?.filter(item => item.colors === selectedcolor)
  .map(item => item._id)
  setid(productId)
  

      if(!selectedcolor) setselectedcolor(color?.[0])

},[selectedcolor])


const handleOnClick = (type) =>{
      setselectedcolor(type)
      setToggleState(type)
}



const addToBasket = async (e,id) =>{

  const quantity = 1

  if(colorqty > 0){
    
      dispatch ({
        type:'ADD_TO_BASKET',  
        item: {
         ...e,
         color:selectedcolor,
         quantity
        }
      }) 
      
      await axios.put(`/api/colordecrement/${id}`, {slug: Product.slug})

      window.location.href="/Checkout"
      
    }else{
      
      toast.error('Item is Out of Stock')

  } 

};    

console.log(id)

return (
  <motion.div  initial={{opacity:0}} animate={{opacity:1}} className="py-5">
  
  <div className="d-flex justify-content-between align-items-center product-details-details">

  <div className="imgSelection">

<div className="w-100 d-flex align-items-center justify-content-center">

  <div>
    {Product.images?.map((item, index) => (
      <img   className={toggleState === index ? "active-content contentImg" : 'contentImg'} src={item.url} alt="" />
    ))}
  </div>

  <div className="imgScroll">
    {Product.images?.map((item, index) => (
      <img className={toggleState === index ? "active-tabs tabImg" : 'tabs tabImg'} src={item.url} alt="" />
    ))}
  </div>

</div>

</div>

  <div className="product-details p-4">
    <h5>{Product.title}</h5>
    <hr></hr>

    <div className="btn-variants">
        

 {colorlist?.map((color,index) => (

  <SelectorButton key={index} handleClick={handleOnClick} toggleTab={toggleTab} index={index} type={color} active={selectedcolor === color}/>


  ))}    
 
        

          </div>


    <p>{Product.description}</p>
    <h5>£{Product.price}</h5>


{colorqty > 0 ? <span className="text-success">Item in Stock</span> : <span className="text-danger">Out Of Stock</span> }

<div className="d-flex py-2 justify-content-center">


<button className="border-0 text-white p-2 mx-2 px-3 rounded-1 bg-primary" onClick={()=> navigate('/product')}>Back To Store</button>



 
    <div className='button__cart'>    
      <button className='border-0 text-white p-2 px-3 rounded-1 bg-primary' onClick={() => addToBasket(Product,id)}>
            Add to basket
      </button>
    </div>
  
  

  </div>

  </div>


  </div>

  <hr></hr>

  <div className="text-center">
    <h5>Features</h5>
    {Product.details?.map((item)=> (
      <ul>
        <li>{item.featureDetails}</li>
      </ul>
    ))}
  </div>

  

</motion.div>
)
}

export default TanksInfo