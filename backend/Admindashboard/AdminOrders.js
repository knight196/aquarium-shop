const express = require('express')
const cloudinary = require('cloudinary').v2
const Orders = require('../Schema/Orders')
const addProduct = require('../Schema/addProduct')
const dotenv = require('dotenv')
const adminmessage = require('../Schema/adminmessage')
const User = require('../Schema/User')
const usermessage = require('../Schema/usermessage')

dotenv.config()

//cloudinary config
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
   })

const router = express.Router()

//finding specific user's order by one id from admin

router.get('/orders/_id/:id', async (req,res) => {
    const orderId = await Orders.findOne({_id:req.params.id})
    if(orderId){
      res.send(orderId)
    }else{
      res.status(404).send({message:"User's order not found"})
    }
  })

  //finding specific user id contactmessage
router.get('/addcontactmsg/_id/:id', async (req,res)=> {
  const contactId = await adminmessage.findOne({_id:req.params.id})
  if(contactId){
   res.send(contactId)
  }else{
    res.status(404).send({message:'Orders not found'})
  }
})


//refund option from admindashboard
router.put('/orders/:id', async(req,res)=> {
    try{
      const refundId = await Orders.findById(req.params.id)
  
      const refunded = await Orders.findOneAndUpdate(
      {_id: req.params.id},
      {Refund:!refundId.Refund}
      )
  
      await refunded.save();
  
      return res.status(200).json(refunded)
  
    }catch(err){
      console.log(err)
      res.status(500).send(err)
    }
  })

  //check if items is delivered successfully

  router.put('/ordersdeliver/:id', async (req,res)=> {
    try{
      const deliverId = await Orders.findById(req.params.id)

      const deliver = await Orders.findOneAndUpdate(
        {_id:req.params.id},
        {Delivered:!deliverId.Delivered}
      )

      await deliver.save();

      return res.status(200).json(deliver)

    }catch(err){
      console.log(err)
      res.status(500).send(err)
    }
  })

  //orders delete from admindashboard
router.delete('/orders/:id', async (req,res)=> {
    try{
      const deleteId = await Orders.findByIdAndDelete(req.params.id)
      if(!req.params.id){
        return res.status(400).send()
      }
      res.send(deleteId)
    }catch(err){
      res.status(500).send(err)
    }
  })

  //delete on newproducts
router.delete('/:id', async(req,res)=> {
    try{
    const deleteId = await addProduct.findByIdAndDelete(req.params.id)
      if(!req.params.id){
        return res.status(400).send()
      }
      res.send(deleteId)
  }catch(err){
      res.status(500).send(err)
    }
  })
  
  //get new created products
  router.get('/newproducts', async(req,res) => {
    const newproducts = await addProduct.find()
    res.json({
      newproducts: newproducts
    })
  })

  //get all user

router.get('/users', async (req,res) => {
  const users = await User.find();

  res.json({
    users:users
  })

})

//get user orders

router.get('/orders', async (req,res) => {
  const orders = await Orders.find()

  res.json({
    orders:orders
  })
})

//send update update to user
router.post('/adminmessage', async (req,res)=> {
  const adminmsg = await adminmessage.create(req.body)
  
  res.status(201).json({
    success:true,
    adminmsg
  })
  })
  

//user's orders msg in admin 
router.get('/adminmessage', async (req,res)=> {
  const adminmsg = await adminmessage.find()
  res.json({
    adminmsg:adminmsg
  })
})



//unwanted message delete
router.delete('/adminmessage/:id', async (req,res)=> {
  try{
    const deleteadminmsgId = await adminmessage.findByIdAndDelete(req.params.id)
    if(!req.params.id){
      return res.status(400).send()
    }
    res.send(deleteadminmsgId)
  }catch (err){
    res.status(500).send(err)
  }
})

  

  module.exports = router