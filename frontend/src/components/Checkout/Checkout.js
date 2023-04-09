import {useState,useEffect} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import { getBasketTotal,getTotalBasketQty } from '../../reducer'
import { qty } from '../../reducer'
import './Checkout.css'
import Basket from './Basket'


export default function Total() {


  let [{user,deliveryOptions,basket}, dispatch] = useStateValue()

  const navigate = useNavigate();

    
  const [deliveryOption,setdeliveryOptions] = useState('Standard')
  
  const [price,setprice] = useState(4.99)
  
  
const deliveries = [
  {
    options:'Standard',
    price:4.99
  },
  {
    options:'Tracked',
    price:5.99
  }
]

const deliverySelect = (e,price) => {
    setdeliveryOptions(e.target.value)
    setprice(price)
    }
    
    useEffect(() => {
      dispatch({
        type:'SET_DELIVERY',
        payload:{
          options:deliveryOption,
          price:price
        }
      })
    },[deliveryOption])
    
    
    
      useEffect(() => {
        localStorage.setItem('deliveryOptions', JSON.stringify(deliveryOptions))
      },[deliveryOptions])

      function process(){
        if(!user){
          navigate('/Login')
        }else{
          navigate('/Address')
        }
      }
      
    

  return (

      
  <div className="checkout h-100 bg-white rounded-1 bg-opacity-50">

    <Basket/>

<div className='checkout__right'>
<div className='subtotal bg-secondary bg-opacity-50 p-2'>

<div>

  <h5>Delivery Options</h5>

{deliveries.map(item => (
<>
<input type="radio" value={item.options} checked={deliveryOption === item.options} onChange={(e) => deliverySelect(e,item.price)}/> <label>{item.options} + {item.price}</label> <br></br>
</>
))}


</div>

<hr/>

  <p>Subtotal({qty(basket)} items): £{getBasketTotal(basket).toFixed(2)}</p>
  
  <p>Delivery-Options: {deliveryOptions.options} + £{deliveryOptions.price}</p>
  <strong>Total:£{(getTotalBasketQty(basket) + parseFloat(deliveryOptions.price)).toFixed(2)}</strong>
  
  <div className="d-flex justify-content-center">
<button className="border-0 bg-primary text-white p-1" onClick={process}>Procced to Checkout</button>
  </div>
</div>
</div>

</div>
  )
}
