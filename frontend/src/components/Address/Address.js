import React,{useState} from 'react'
import {useStateValue} from '../../StateProvider'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import CheckoutSteps from '../CheckoutSteps'
function Address() {

    const [{}, dispatch] = useStateValue();

  
    const [street,setStreet] = useState('');
    const [city,setCity] = useState('');
    const [postcode,setPostCode] = useState('');
  const [phone,setphone] = useState(0)

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

      const regex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/

      const streetName = /^\d{1,3}.?\d{0,3}\s[a-zA-Z]{2,30}\s[a-zA-Z]{2,15}/

      const ContactNo = /^07\d{3}(\s)?\d{6}/
    
      if (!streetName.test(street)){
        if(street === ''){
          alert('Please enter your street Name')
        }else{
          alert('Please Enter a valid street Name')
        }
      }else if(city === ''){
        alert('Please enter your city')
      }else if(!regex.test(postcode)){
        if(postcode === ''){
          alert('Please enter your PostCode')
        }else{
          alert('Please Enter a valid postcode')
        }
      }else if(!ContactNo.test(phone)){
        if(phone === ''){
          alert('Please enter your Contact Number')
        }else{
          alert('Please enter a valid Contact number')
        }
      }
      else{
        navigate('/Payment')
      }
    }

  return (
    <>
    
    <CheckoutSteps step1 step2 step3></CheckoutSteps>

    <div className="p-2 mt-5">
      <h5 className="text-center">Customer's Address</h5>
      <hr></hr>
    <div className="address-input">
      
 
                       
                        <p>Street Name</p>
                        <input type="text"  onChange={(e) => setStreet(e.target.value)} value={street} className="w-100 border-0 p-1" placeholder="Enter your street Name" required/>
                        <p>City</p>
                        <input type="text" className="w-100 p-1 border-0" onChange={(e)=> setCity(e.target.value)} value={city} placeholder="Enter your Address" requird/>
                        <p>Post Code</p>
                        <input type="text" onChange={(e) => setPostCode(e.target.value)} value={postcode} className="w-100 p-1 border-0" placeholder="Enter your PostCode" required/>
                       
                        <p>Contact No</p>
                        <input type="number" onChange={(e) => setphone(e.target.value)} value={phone} className="w-100 p-1 border-0" placeholder="Enter your Contact No" required/>
                       
                     
    </div>


    <div className="d-flex justify-content-center m-2">
 
    <button className="px-2 bg-primary btn text-white" onClick={deliver}>Proceed to Payment</button>
    </div>

    </div>
    </>
  )
}

export default Address
