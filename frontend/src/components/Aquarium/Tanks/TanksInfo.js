// import { Button,Descriptions } from 'antd';
import React, {useEffect, useState} from 'react';
// import styled from "styled-components";
import { useStateValue } from '../../../StateProvider';
import {Link,useNavigate} from "react-router-dom";
import {motion} from 'framer-motion'
import SelectorButton from './SelectorButton';
import './Tanks.css'
// import { useAlert } from 'react-alert';

function TanksInfo(props) {

  const [Product, setProduct] = useState([])
  
    const [{basket},dispatch]=useStateValue();

let navigate = useNavigate();

useEffect(()=>{
  setProduct(props.detail)
}, [props.detail])  


// const [selectedcolor,setselectedcolor] = useState('')

const [toggleState, setToggleState] = useState(0)

const toggleTab = (index) => {
  setToggleState(index)
}


// const handleOnClick = (type) =>{
//     setselectedcolor(type)
// }    

const [colorlist,setcolorlist] = useState([])

const [selectedcolor,setselectedcolor] = useState('')


useEffect(() => {

  const color = Product.colors?.map(item => item.colors)
      .filter((v, i, a) => a.indexOf(v) === i)
      setcolorlist(color)

      if(!selectedcolor) setselectedcolor(color?.[0])

},[selectedcolor])

console.log(selectedcolor)

const handleOnClick = (type,att) =>{
  if(type === 'color'){
      setselectedcolor(att)
      return
  }
}



const addToBasket=(e) =>{
    if(!selectedcolor){
    e.preventDefault();  
      alert('Please select a color')
    }  
    else{
      //dispatch the item into the data layer
      dispatch ({
      type:'ADD_TO_BASKET',  
      item: {
        slug: props.detail.slug, 
        title: props.detail.title,
        image: props.detail.image,
        color:selectedcolor,
        price: props.detail.price
      },  
    })  
    }
};    





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
      <img className={toggleState === index ? "active-tabs tabImg" : 'tabs tabImg'} src={item.url} onClick={() => toggleTab(index)} alt="" />
    ))}
  </div>

</div>

</div>

  <div className="product-details p-4">
    <h5>{Product.title}</h5>
    <hr></hr>

    <div className="btn-variants">
 {colorlist?.map((color,index) => (
  <SelectorButton key={index} handleClick={handleOnClick} type="color" att={color} active={selectedcolor === color}/>
 ))}
    {/* {Product.colors?.map(item => item.colors)
    .map((color) => <button className={selectedcolor === color ? 'bg-primary bg-opacity-50 border-0 p-2 py-1 m-1 ' : 'border-0 p-2 py-1 m-1'} onClick={()=>handleOnClick(color)}>{color}</button>
    )} */}
          </div>


    <p>{Product.description}</p>
    <h5>£{Product.price}</h5>

<div className="d-flex py-2 justify-content-center">


<button className="border-0 text-white p-2 mx-2 px-3 rounded-1 bg-primary" onClick={()=> navigate('/product')}>Back To Store</button>



  <Link to={'/Checkout'}>
    <div className='button__cart'>    
      <button className='border-0 text-white p-2 px-3 rounded-1 bg-primary' onClick={addToBasket}>
            Add to basket
      </button>
    </div>
  </Link>
  

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