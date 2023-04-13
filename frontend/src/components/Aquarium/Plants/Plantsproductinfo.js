// import { Button,Descriptions } from 'antd';
import React, {useEffect, useState} from 'react';
// import styled from "styled-components";
import { useStateValue } from '../../../StateProvider';
import Select from 'react-select';
import {Link,useNavigate} from "react-router-dom";
import './Plants.css'
import {motion} from 'framer-motion'
import { toast } from 'react-toastify'
// import { useAlert } from 'react-alert';

function Plantsproductinfo(props) {

  const [Product, setProduct] = useState([])
  
    const [{basket},dispatch]=useStateValue();

let navigate = useNavigate();

    useEffect(()=>{
        setProduct(props.detail)
      }, [props.detail])
      
const [packaging,setpackaging] = useState();

const packageOptions = Product.variants?.map((p) => p.packaging)
  .filter((v, i, a) => a.indexOf(v) === i)
  .map((packaging) => ({ label: packaging, value:packaging }))

   const priceOptions = Product.variants?.filter((p) =>  packaging && p.packaging=== packaging.value)
  .map((p) => p.price)
  .filter((v, i, a) => a.indexOf(v) === i)
  .map((price) => ({ label: price, value:price }));


  let priceFinal = {}
  if(priceOptions?.length===1){priceFinal=priceOptions[0].value}

  const quantityUpdate = Product.variants?.filter((p) =>  packaging && p.packaging=== packaging.value)
  .map((p) => p.quantity)
  .filter((v, i, a) => a.indexOf(v) === i)
  .map((p) => ({ label: p, value:p }));


  let updateFinal = {}
  if(quantityUpdate?.length===1){updateFinal=quantityUpdate[0].value}


const addToBasket=(e) =>{

  const existItem = basket.find(x => x.slug === props.detail.slug + packaging?.value) 

  const quantity = existItem ? existItem.quantity : 1

if(updateFinal === 0){
  toast.error('Item is Out of Stock')
}else{
  //dispatch the item into the data layer
  if(!packaging?.value){
    toast.warning('Please select a packaging')
    }else{

      dispatch ({
        type:'ADD_TO_BASKET',
        item: {
          ...e,quantity,packaging:packaging?.value,price:priceFinal,qty:updateFinal
      },
    })
    window.location.href='/Checkout'  
  }
}

};



return (
  <motion.div  initial={{opacity:0}} animate={{opacity:1}} className="py-5">
  
  <div className="d-flex justify-content-between align-items-center product-info">

<div className="product-img">
<img  src={Product.image?.url} alt={Product.title}/>
</div>

  <div className="product-details p-4">
    <h5>{Product.title}</h5>
    <hr></hr>

<Select value={packaging} onChange={setpackaging} options={packageOptions} isClearable/>

    <p>{Product.description}</p>
    <h5>£{Product.price}</h5>

    <div>

      {updateFinal > 0 ? (<p className="text-success px-2 py-1">Item is in Stock</p>) : (<p className="text-danger w-50 px-2 py-1">Out of Stock</p>) }
     
      </div>

<div className="d-flex py-2 justify-content-center">


<button className="border-0 text-white p-2 mx-2 px-3 rounded-1 bg-primary" onClick={()=> navigate('/product')}>Back To Store</button>



    <div className='button__cart'>    
      <button className='border-0 text-white p-2 px-3 rounded-1 bg-primary' onClick={()=>addToBasket(Product)}>
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

export default Plantsproductinfo