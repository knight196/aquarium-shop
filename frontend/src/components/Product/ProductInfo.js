// import { Button,Descriptions } from 'antd';
import React, {useEffect, useState} from 'react';
// import styled from "styled-components";
import { useStateValue } from '../../StateProvider';
import Select from 'react-select';
import {Link,useNavigate} from "react-router-dom";
import './Product.css'
import {motion} from 'framer-motion'
// import { useAlert } from 'react-alert';

function ProductInfo(props) {

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


const addToBasket=(e) =>{
    // if(!packaging?.value){
    // e.preventDefault();
    //   alert('Please select a packaging')
    // }
    // else{
      //dispatch the item into the data layer
      dispatch ({
      type:'ADD_TO_BASKET',
      item: {
        slug: props.detail.slug, 
        title: props.detail.title,
        image: props.detail.image,
        // packaging:packaging?.value,
        // price: priceFinal,
        price:props.detail.price
      },
    })
  
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

{/* <Select value={packaging} onChange={setpackaging} options={packageOptions} isClearable/> */}

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

export default ProductInfo