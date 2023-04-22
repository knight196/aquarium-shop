const express = require('express')

const Product = require('../Schema/addProduct')


const productRouter = express.Router();


productRouter.get('/products', async (req,res) => {
    const products = await Product.find()
  res.json({
    products:products  
  })
})


//product id 
productRouter.get('/products/slug/:slug', async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })


  //plants with product variants
  productRouter.get('/plants/slug/:slug', async (req,res)=> {
    const product = await Product.findOne({slug:req.params.slug})
    if(product){
      res.send(product)
    }else{
      res.status(404).send({message:'Product Not Found'})
    }
  })


  //tanks cabinets variants
  productRouter.get('/tanks/slug/:slug', async(req,res) => {
    const product = await Product.findOne({slug:req.params.slug})
    if(product){
      res.send(product)
    }else{
      res.status(404).send({message: 'Product Not Found'})
    }
  })

  //edit the product 
  productRouter.get('/editProduct/:slug', async (req,res) => {

    const product = await Product.findOne({slug:req.params.slug})

    if(product){
      res.send(product)
    }else{
      res.status(404).send({message:'Product Not Found'})
    }

  })

  //decrement the stock value by adding the stock plants section

productRouter.put('/decrement/:id', async (req,res) => {

  try{
  
  
  const qtyupdate = await Product.findOneAndUpdate({slug:req.body.slug,'variants._id': req.params.id},
  {$inc: {'variants.$.quantity': -1}}
  )
  
  res.status(200).json(qtyupdate)
  
  }catch(err){
    res.status(404).send(err)
  }
  
  })
  
  
  // increase the value of the stock when decreasing the value of the stock plants section
  
  productRouter.put('/increment/:id', async (req,res) => {
  
  
    try{
    
    
    const qtyupdate = await Product.findOneAndUpdate({slug:req.body.slug,'variants._id': req.params.id},
    {$inc: {'variants.$.quantity': 1}}
    )
    
    res.status(200).json(qtyupdate)
    
    }catch(err){
      res.status(404).send(err)
    }
    
    })

    //add plants product quantity when user remove the product from the cart

    productRouter.put('/removePlantsIncrement/:id', async (req,res) => {

      try{

        const qtyupdate = await Product.findOneAndUpdate({slug:req.body.slug,'variants._id':req.params.id},
        {$inc:{'variants.$.quantity': req.body.quantity}}
        )

        res.status(200).json(qtyupdate)

      }catch(err){
        res.status(404).send(err)
      }

    })

    //increment the product of the if variant is different in the plantsinfo

    productRouter.put('/basketPlantsInc/:id', async (req,res) => {
      try{

        const qtyupdate = await Product.findOneAndUpdate({slug:req.body.slug,'variants._id': req.params.id},
        {$inc: {'variants.$.quantity': req.body.quantity}}
        )

        res.status(200).json(qtyupdate)

      }catch(err){
        res.status(404).send(err)
      }
    })

  //decrement the stock value by adding the stock product section

productRouter.put('/productdecrement/:slug', async (req,res) => {

  try{
  
  
  const qtyupdate = await Product.findOneAndUpdate(
  {slug:req.params.slug},
  {$inc: {quantity: -1}}
  )
  
  res.status(200).json(qtyupdate)
  
  }catch(err){
    res.status(404).send(err)
  }
  
  })
  
  
  // increase the value of the stock when decreasing the value of the stock product section
  
  productRouter.put('/productincrement/:slug', async (req,res) => {
  
  
    try{
    
    
    const qtyupdate = await Product.findOneAndUpdate(
    {slug:req.params.slug},
    {$inc: {quantity: 1}}
    )
    
    res.status(200).json(qtyupdate)
    
    }catch(err){
      res.status(404).send(err)
    }
    
    })
    
  // increase the value of the stock when user click on the remove button 
  
  productRouter.put('/removeProductIncrement/:slug', async (req,res) => {
  
  
    try{
    
    
    const qtyupdate = await Product.findOneAndUpdate(
    {slug:req.params.slug},
    {$inc: {quantity: req.body.quantity}}
    )
    
    res.status(200).json(qtyupdate)
    
    }catch(err){
      res.status(404).send(err)
    }
    
    })
    


    //decrement the stock value by adding the stock color variant section

productRouter.put('/colordecrement/:id', async (req,res) => {

  try{
  
  
  const qtyupdate = await Product.findOneAndUpdate({slug:req.body.slug,'colors._id': req.params.id},
  {$inc: {'colors.$.quantity': -1}}
  )
  
  res.status(200).json(qtyupdate)
  
  }catch(err){
    res.status(404).send(err)
  }
  
  })



  
  // increase the value of the stock when decreasing the value of the stock color variant section
  
  productRouter.put('/colorincrement/:id', async (req,res) => {
  
  
    try{
    
    
    const qtyupdate = await Product.findOneAndUpdate({slug:req.body.slug,'colors._id': req.params.id},
    {$inc: {'colors.$.quantity': 1}}
    )
    
    res.status(200).json(qtyupdate)
    
    }catch(err){
      res.status(404).send(err)
    }
    
    })

  // increase the value of the stock when user click on the color variant remove button
  
  productRouter.put('/removeColorIncrement/:id', async (req,res) => {
  
  
    try{
    
    
    const qtyupdate = await Product.findOneAndUpdate({slug:req.body.slug,'colors._id': req.params.id},
    {$inc: {'colors.$.quantity': req.body.quantity}}
    )
    
    res.status(200).json(qtyupdate)
    
    }catch(err){
      res.status(404).send(err)
    }
    
    })

    //increment the value of the color stock if color is not equal


    productRouter.put('/baskecolorInc/:id', async (req,res) => {
  
  
      try{
      
      
      const qtyupdate = await Product.findOneAndUpdate({slug:req.body.slug,'colors._id': req.params.id},
      {$inc: {'colors.$.quantity': req.body.quantity}}
      )
      
      res.status(200).json(qtyupdate)
      
      }catch(err){
        res.status(404).send(err)
      }
      
      })
  





module.exports = productRouter