const Orders = require('../Schema/Orders')
const express = require('express')
const usermessage = require('../Schema/usermessage')
const adminmessage = require('../Schema/adminmessage')
const productModel = require('../Schema/addProduct')

const router = express.Router();


//finding specific order by one id from user
router.get('/get/_id/:id', async (req,res)=> {
  const orderId = await Orders.findOne({orderId:req.params.id})
  if(orderId){
   res.send(orderId)
  }else{
    res.status(404).send({message:'Orders not found'})
  }
})

//finding contact msg from user
router.get('/addcontactmsg/_id/:id', async (req,res)=> {
  const contactId = await usermessage.findOne({_id:req.params.id})
  if(contactId){
   res.send(contactId)
  }else{
    res.status(404).send({message:'Orders not found'})
  }
})


  //return the item

  router.put('/ordersreturn/:id', async (req,res)=> {
    try{
      const returnId = await Orders.findOne({orderId:req.params.id})

      const returnitem = await Orders.findOneAndUpdate(
        {orderId:req.params.id},
        {Return:!returnId.Return}
      )

      await returnitem.save();

      return res.status(200).json(returnitem)

    }catch(err){
      console.log(err)
      res.status(500).send(err)
    }
  })

//api for orders
// API TO add ORDER DETAILS

router.post("/add", async(req, res) => {
  const products = req.body.basket;
  const subtotal = req.body.subtotal
  const amount = req.body.amount;
  const email = req.body.email;
  const username = req.body.username
  const address = req.body.address;
  const paymentCreate = req.body.paymentCreate
  const orderId = req.body.orderId
  const deliveryOptions = req.body.deliveryOptions
  const deliveryPrice = req.body.deliveryPrice
  const deliveryDate = req.body.deliveryDate

  const orderDetail = {
    products: products,
    paymentCreate,
    subtotal:subtotal,
    amount: amount,
    address: address,
    email: email,
    username:username,
    orderId:orderId,
    deliveryOptions:deliveryOptions,
    deliveryPrice:deliveryPrice,
    deliveryDate: deliveryDate
  };

  Orders.create(orderDetail, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("order added to database >> ", result);
    }
  });


});

router.post("/get", (req, res) => {
  const email = req.body.email;

  Orders.find((err, result) => {
    if (err) {
      console.log(err);
    } else {
      const userOrders = result.filter((order) => order.email === email);
      res.send(userOrders);
    }
  });
});


// cancel order update from user dashboard
router.put('/get/:id', async (req,res)=> {
    try{
      const cancelId = await Orders.findOne({orderId: req.params.id})
  
      const cancelOrder = await Orders.findOneAndUpdate(
        {orderId: req.params.id},
        {Cancel:!cancelId.Cancel}
      )
  
      await cancelOrder.save();
  
      return res.status(200).json(cancelOrder)
  
    }catch(err){
      console.log(err)
      res.status(500).send(err)
    }
  })
  
  // delete orders from user dashboard
router.delete('/get/:id', async (req,res)=> {
    try{
      const deleteId = await Orders.findOneAndDelete(req.params.id)
      if(!req.params.id){
        return res.status(400).send()
      }
      res.send(deleteId)
    }catch(err){
      res.status(500).send(err)
    }
  })

  
//ordersmsg send to admin 
router.post('/adminmessage', async (req,res)=> {
  const adminmsg = await adminmessage.create(req.body)
  
  res.status(201).json({
    success:true,
    adminmsg
  })
  
  })
  
  //add additional confirm message in user
  router.post('/addusermessage/', async(req,res)=> {
    const usermsg = usermessage.create(req.body)

    res.status(201).json({
      success:true,
      usermsg
    })

  })

  //filtering of each user message
  router.post("/getusermessage", (req, res) => {
    const username = req.body.username;
  
    usermessage.find((err, result) => {
      if (err) {
        console.log(err);
      } else {
        const usermsg = result.filter((order) => order.username === username);
        res.send(usermsg);
      }
    });
  });
  


  //delete the message 
  router.delete('/usermessage/:id', async (req,res)=> {
    try{
      const deleteusermsgId = await usermessage.findByIdAndDelete(req.params.id)
      if(!req.params.id){
        return res.status(400).send()
      }
      res.send(deleteusermsgId)
    }catch (err){
      res.status(500).send(err)
    }
  })


  module.exports = router;