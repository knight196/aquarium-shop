import React,{useReducer,useState,useEffect} from 'react'
import {Route,Routes} from 'react-router-dom'
import Products from '../components/Product/Product'

//aqaurium product starts 

// start of plants section
import Plants from '../components/Aquarium/Plants/Plants'

import PlantsProductDetail from '../components/Aquarium/Plants/PlantsProductDetail'

import Foreground from '../components/Aquarium/Plants/Foreground'
import Midground from '../components/Aquarium/Plants/Midground'
import Background from '../components/Aquarium/Plants/Background'

// end of plants section



import Filter from '../components/Aquarium/Filter/Filter'


//heater
import Heater from '../components/Aquarium/Heater/Heater'

// tanks
import Tanks from '../components/Aquarium/Tanks/Tanks'

// subpath of tanks

import Oase from '../components/Aquarium/Tanks/Oase'
import Nano from '../components/Aquarium/Tanks/Nano'
import DD from '../components/Aquarium/Tanks/DD'

import TanksDetail from '../components/Aquarium/Tanks/TanksDetail'

// end of subpath tank

// end of tanks

import Co2 from '../components/Aquarium/CO2/CO2'
import Other from '../components/Aquarium/Other/Other'
import WoodsRocks from '../components/Aquarium/Woods&Rocks/WoodsRocks'
import Soil from '../components/Aquarium/Soil/Soil'

// lighting
import Lighting from '../components/Aquarium/Lighting/Lighting'

//subpath of lighting
import TwinstarC from '../components/Aquarium/Lighting/TwinstarC'
import TwinstarE from '../components/Aquarium/Lighting/TwinstarE'
import TwinstarS from '../components/Aquarium/Lighting/TwinstarS'

//end of subpath of lighting

import Fertiliser from '../components/Aquarium/PlantFertiliser/Fertiliser'

// aquarium product ends


import Login from '../components/Account/Login'
import Home from '../components/Home/Home'
import ProductDetail from '../components/Product/ProductDetail'
import Checkout from '../components/Checkout/Checkout'
import Payment from '../components/Payment/Payment'
import Address from '../components/Address/Address'
import Signup from '../components/Account/SignUp'
import Userdashboard from '../components/dashboard/Userdashboard/Userdashboard'
import Admindashboard from '../components/dashboard/AdminDashboard/Admindashboard' 
import UserOrderInfo from '../components/dashboard/Userdashboard/OrdersInfo'
import AdminOrderInfo from '../components/dashboard/AdminDashboard/AdminOrderInfo'
import Contact from '../components/Contact/Contact.js'
import Usercontactmsg from '../components/dashboard/Userdashboard/Usercontactmsg'
import AdminContactmsg from '../components/dashboard/AdminDashboard/AdminContactmsg'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import Passwordreset from '../components/Account/Passwordreset'
import Emailconfirm from '../components/Account/Email'
import EditProduct from '../components/dashboard/AdminDashboard/EditList'

import FailedPayment from '../components/dashboard/Userdashboard/FailedPayment'

//review of the products
import PlantsReview from '../components/Aquarium/Plants/PlantsProductReview'
import ProductReview from '../components/Product/Productreview'


export default function RootChange() {

  const stripePromise = loadStripe('pk_test_51LtvUXJI0em1KAyRvQVz8eLL2Q1Mva0cNgWH5jMqyLR4682taIOg8K56mJUei50MTl1iMvj37iGhfwlgRBJ39dEy00nhy5zi37')



  return (
    <div>
    
        <Routes>
          
        <Route path="/"  element={<Home/>}></Route>
          <Route path="/Product" element={<Products/>}></Route>
         
         {/* aquarium product starts here */}
         
{/* subpath of plants */}

          <Route path="/plants" element={<Plants/>}></Route>

          {/* start of subpath plants */}
        <Route path="/foreground" element={<Foreground/>}></Route>
        <Route path="/midground" element={<Midground/>}></Route>
        <Route path="/background" element={<Background/>}></Route>

          {/* end of subpath plants */}

{/* end of plants*/}



          <Route path="/co2" element={<Co2/>}></Route>
          <Route path="/other" element={<Other/>}></Route>

          {/* start of lighting subpath */}
          <Route path="/lighting" element={<Lighting/>}></Route>
          

          <Route path="/twinstar-c" element={<TwinstarC/>}></Route>
          <Route path="/twinstar-e" element={<TwinstarE/>}></Route>
          <Route path="/twinstar-s" element={<TwinstarS/>}></Route>
          {/* end of lighting subpath */}
          
          <Route path="/fertiliser" element={<Fertiliser/>}></Route>
          <Route path="/woodsrocks" element={<WoodsRocks/>}></Route>
          <Route path="/soil" element={<Soil/>}></Route>

    {/* tanks */}
          <Route path="/tanks" element={<Tanks/>}></Route>

          <Route path="/api/tanks/slug/:slug" element={<TanksDetail/>}/>

{/* subpath of tanks */}

<Route path='/oase' element={<Oase/>}></Route>
<Route path='/d&d' element={<DD/>}></Route>
<Route path='/nano' element={<Nano/>}></Route>

{/* end of subpath tanks */}

    {/* tanks */}


          <Route path="/filter" element={<Filter/>}></Route>
          
          <Route path="/heater" element={<Heater/>}></Route>

          

           {/*aquarium product ends here  */}

          <Route path="/Checkout"  element={<Checkout/>}></Route>
      
          <Route path="/Address" element={<Address/>}></Route>
          <Route path="/Login"  element={<Login />}></Route>
          <Route path="/Signup"  element={<Signup />}></Route>
          <Route path="/user/dashboard" element={<Userdashboard/>}/>
          <Route path="/admin/dashboard" element={<Admindashboard/>}/>
          <Route path="/passwordReset/:id" element={<Passwordreset/>}/>
          <Route path="/Emailconfirm" element={<Emailconfirm/>}/>
          <Route path="/editProduct/:slug" element={<EditProduct/>}/>
           <Route  path="/api/products/slug/:slug" element={<ProductDetail/>}/>
          <Route path="/api/plants/slug/:slug" element={<PlantsProductDetail/>}/>
           <Route  path="/ordersInfo/:id" element={<UserOrderInfo/>}/>
           <Route  path="/orders/addcontactmsg/_id/:id" element={<Usercontactmsg/>}/>
           <Route  path="/api/addcontactmsg/_id/:id" element={<AdminContactmsg/>}/>
           <Route  path="/api/orders/_id/:id" element={<AdminOrderInfo/>}/>
           <Route  path="/payment" element={<Elements stripe={stripePromise}><Payment/></Elements>}/>
           <Route  path="/Contact" element={<Contact/>}/>

           <Route path="/failedpayment/:id" element={<Elements stripe={stripePromise}><FailedPayment/></Elements>}/>

          <Route path="/api/plants/slug/:slug/WriteProductReview" element={<PlantsReview/>}/>
          <Route path="/api/tanks/slug/:slug/WriteProductReview" element={<PlantsReview/>}/>
          <Route path="/api/products/slug/:slug/WriteProductReview" element={<ProductReview/>}/>

        </Routes>
 
    </div>
  )
}
