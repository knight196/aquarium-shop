import React,{useState} from 'react'
import {useStateValue} from '../../StateProvider'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
function Address() {

    const [{}, dispatch] = useStateValue();

  
    const [street,setStreet] = useState('');
    const [city,setCity] = useState('');
    const [postcode,setPostCode] = useState('');
    const [phone,setPhone] = useState('')

    const navigate = useNavigate()

   const deliver = (e) => {
      e.preventDefault()

      dispatch({
        type:'SET_ADDRESS',
        item: {
         
          street,
          city,
          postcode,
          phone
        }
      })

      if (street === ''){
        alert('Please enter your street Name')
      }else if(city === ''){
        alert('Please enter your city')
      }else if(postcode === ''){
        alert('Please enter your PostCode')
      }else if(phone === ''){
        alert('Please enter your phone Number')
      }
      else{
        navigate('/Payment')
      }
    }

  return (
    <div className="p-2">
      <h5 className="text-center">Customer's Address</h5>
      <hr></hr>
    <div className="address-input">
      
 
                       
                        <p>Street Name</p>
                        <input type="text"  onChange={(e) => setStreet(e.target.value)} value={street} className="w-100 border-0 p-1" placeholder="Enter your street Name" required/>
                        <p>City</p>
                        <input type="text" className="w-100 p-1 border-0" onChange={(e)=> setCity(e.target.value)} value={city} placeholder="Enter your Address" requird/>
                        <p>Post Code</p>
                        <input type="text" onChange={(e) => setPostCode(e.target.value)} value={postcode} className="w-100 p-1 border-0" placeholder="Enter your PostCode" required/>
                        <p>Phone Number</p>
                        <input type="text" onChange={(e) => setPhone(e.target.value)} value={phone} className="w-100 border-0 p-1" placeholder="Enter your Phone Number" required/>
    </div>


    <div className="d-flex justify-content-center m-2">
 
    <button className="px-2 bg-primary btn text-white" onClick={deliver}>Proceed to Payment</button>
    </div>

    </div>
  )
}

export default Address
