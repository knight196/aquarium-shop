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



module.exports = productRouter