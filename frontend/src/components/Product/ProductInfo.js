// import { Button,Descriptions } from 'antd';
import React, {useEffect, useState} from 'react';
// import styled from "styled-components";
import { useStateValue } from '../../StateProvider';
import Select from 'react-select';
import {Link,useNavigate} from "react-router-dom";
import './Product.css'
import {motion} from 'framer-motion'
import { toast } from 'react-toastify'
import axios from 'axios'
import GetProductReview from '../GetProductReview'


function ProductInfo(props) {

  const [Product, setProduct] = useState([])
  
    const [{basket},dispatch]=useStateValue();
    
    
    
    let navigate = useNavigate();

    useEffect(()=>{
        setProduct(props.detail)
      }, [props.detail])

      const product = basket.find(item => item.slug === Product.slug)


const addToBasket= async (item,slug) =>{


  const quantity = 1
  
    if(Product.quantity === 0){
      toast.error('Item is out of Stock')
    }else{

      if(product){
        toast.warning('Item is in Basket')
      }else{

        
        //dispatch the item into the data layer
      dispatch ({
      type:'ADD_TO_BASKET',
      item: {
      
        ...item,quantity,
      },
    })
    
    window.location.href="/Checkout"
    
    await axios.put(`/product/productdecrement/${slug}`)
      }
 
  }
};



return (
  <>
  <motion.div  initial={{opacity:0}} animate={{opacity:1}} className="py-5">
  
  <div className="d-flex justify-content-between align-items-center product-info">

<div className="product-img">
<img src={Product.image?.url} alt={Product.title}/>
</div>

  <div className="product-details p-4">
    <h5>{Product.title}</h5>
    <hr></hr>


    <p>{Product.description}</p>
 
    <h5>£{Product.price}</h5>

    {Product.quantity > 0 ? <span className="text-success">Item in Stock</span> : <span className="text-danger">Out Of Stock</span>}

<div className="d-flex py-2 justify-content-center">


<button className="border-0 text-white p-2 mx-2 px-3 rounded-1 bg-primary" onClick={()=> navigate('/product')}>Back To Store</button>



 
    <div className='button__cart'>    
      <button className='border-0 text-white p-2 px-3 rounded-1 bg-primary' onClick={()=>addToBasket(Product,Product.slug)}>
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

  <hr></hr>

<div className="d-flex justify-content-between align-item-center">

<h5>Reviews</h5>
<Link to={`WriteProductReview`}>
<button className="btn bg-success text-white border-0 px-2 py-1">Write Review</button>
</Link>

</div>

<hr></hr>

<GetProductReview Product={Product}/>


  

</motion.div> 
    
</>
)
}

export default ProductInfo