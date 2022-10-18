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
      
      let minPrice=Product.variants?.map((p) => p.price)
      .sort((a,b)=>a-b)[0]

const [color, setColor] = React.useState();
const [storage, setStorage] = React.useState();

// const [price, setPrice] = React.useState();

const colorOptions = Product.variants?.map((p) => p.color)
.filter((v, i, a) => a.indexOf(v) === i)
.map((color) => ({ label: color, value:color }))

const storageOptions = Product.variants?.filter((p) => color && p.color === color.value)
.map((p) => p.storage)
.filter((v, i, a) => a.indexOf(v) === i)
.map((size) => ({ label:size, value:size }));



const priceOptions = Product.variants?.filter((p) => storage && p.storage === storage.value && color && p.color=== color.value)
.map((p) => p.price)
.filter((v, i, a) => a.indexOf(v) === i)
.map((price) => ({ label: price, value:price }));

let priceFinal={};
if (priceOptions?.length === 1){priceFinal=priceOptions[0].value}
else {priceFinal=minPrice}


const addToBasket=(e) =>{
  if (!color.value){
    e.preventDefault();
     alert('Please select a Color')
   } else if(!storage.value){
    e.preventDefault()
    alert('Please select the storage')
   }
     else {
  //dispatch the item into the data layer
     dispatch ({
      type:'ADD_TO_BASKET',
      item: {
        slug: props.detail.slug, 
        title: props.detail.title,
        image: props.detail.image,
        price: priceFinal,
        color: color?.value,
        storage:storage?.value
      },
    })}

};

const [toggleState,setToggleState] = useState(0)

const toggleTab = (index) => {
  setToggleState(index)
}


return (
  <div className="py-5">
  <div className="Product-details text-center w-100 px-2">

<div className="imgSelection">

<div className="px-5">
  
  <div className="d-flex align-items-center justify-content-center">
{Product.images?.map((item,index)=> (
      <img className={toggleState === index ? "active-content contentImg" : 'contentImg'} src={ item.url} alt=""/>
   ))}
  </div>

<div className="imgScroll">
{Product.images?.map((item,index)=> (
    <img className={toggleState === index ? "active-tabs tabImg" : 'tabs tabImg'} src={ item.url} onClick={()=>toggleTab(index)} alt=""/>
  ))}
  </div>

</div>

  </div>

  <div className="product-details-details">
    <h1>{Product.title}</h1>

      
      <p className='prod__desc'>Color</p>
      <div >
      <Select value={color} onChange={setColor} options={colorOptions} isClearable/>
      </div>



      <p className='prod__desc'>Storage</p>
      <div >
      <Select value={storage} onChange={setStorage} options={storageOptions} isClearable/>
      </div>



  <hr></hr>

  <div className="d-flex text-left w-100 justify-content-between">
    <ul style={{listStyle:'none'}}>
      <li>Price (inc VAT)</li>
      <li>Delivery</li>
    </ul>
    <ul style={{listStyle:'none'}}>
      <li className="h5"><strong>£{Product.price}</strong></li>
      <li>Free</li>
    </ul>
    <ul style={{listStyle:'none'}}>
      <li><strong>What's included?</strong></li>
      <li>12 Months Warranty</li>
      <li>Free Next Day Delivery</li>
    </ul>
  </div>

  </div>
  </div>

  <hr></hr>

  <div className="text-center">
    <h5>Product Specification</h5>
  <table className="w-100">
<tr>
  <td>Name</td>
    
  <td>{Product.title}</td>
</tr>
<tr>
  <td>Operating System</td>
    
  <td>{Product.Operating}</td>
</tr>
<tr>
  <td>Camera</td>
  <td>{Product.Camera}</td>
</tr>
<tr>
  <td>Battery</td>
  <td>{Product.Battery}</td>
</tr>
<tr>
  <td>Dimensions</td>
  <td>{Product.Dimension}</td>
</tr>
<tr>
  <td>Weight</td>
  <td>{Product.Weight}</td>
</tr>
<tr>
  <td>Connectivity</td>
  <td>{Product.Connectivity}</td>
</tr>
<tr>
  <td>Signal</td>
  <td>{Product.Signal}</td>
</tr>
<tr>
  <td>Screen-Size</td>
  <td>{Product.ScreenSize}</td>
</tr>
<tr>
  <td>Processor</td>
  <td>{Product.Processor}</td>
</tr>
<tr>
  <td>Sim - Type</td>
  <td>{Product.SimType}</td>
</tr>
<tr>
  <td>Memory Card</td>
  <td>{Product.MemoryCard}</td>
</tr>
</table>
<div className="d-flex mt-1 justify-content-center">


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

)
}

export default ProductInfo