const express = require('express')
const addProduct = require('../Schema/addProduct')
const dotenv = require('dotenv')
const path = require('path')

const cloudinary = require('cloudinary').v2

const productRouter = express.Router()

dotenv.config({path:path.resolve(__dirname, '../.env')});

//cloudinary config
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
 })

// cloudinary image upload 
productRouter.post('/newproducts/add', async (req,res) => {

    const {slug,title,category,description,Company,price,image,position,difficulty,CompanyProductName,details,variants,images,colors} = req.body
    try{
  
      const result = await cloudinary.uploader.upload(image, {
        folder:'aquariumShop',
        width:1920,
        crop:'scale'
      })
  
  
      let images = [...req.body.images];
      let imagesBuffer = []
  
      for(let i=0; i<images.length; i++){
       const result = await cloudinary.uploader.upload(images[i], {
          folder:'aquariumvariants',
          width:1920,
          crop:'scale'
        })
        
        imagesBuffer.push({
          public_id:result.public_id,
          url:result.secure_url
        })
        
      }
        
      req.body.images = imagesBuffer
  
  
      const listproducts = await addProduct.create({
        slug,
        title,
        category,
        description,
        Company,
        price,
        image:{
          public_id: result.public_id,
          url:result.secure_url
        },
        position,
        difficulty,
        CompanyProductName,
        details,
        variants,
        images:imagesBuffer,
        colors,
    
      })
    
      res.status(201).json({
        success:true,
        listproducts
      })
    }catch(err){
      console.log(err)
    }
  
  
  })



  productRouter.put('/updateItem/:slug', async (req,res) => {

    const  data = 
    {
      slugName: req.body.slugName,
      title: req.body.title,
      description: req.body.description,
      variants: req.body.variants,
      details: req.body.details,
      price: req.body.price,
      colors: req.body.colors,
      quantity:req.body.quantity
    }

    try{

    
        
          const newImage = await cloudinary.uploader.upload(req.body.image, {
          folder:'updateAquariumShop',
          width:1920,
          crop:'scale'
        })

        data.image ={
          public_id:newImage.public_id,
          url:newImage.url
        }

        
   
        let images = [...req.body.images];
        
        let updateImages = [...req.body.updateImages]

        let imagesBuffer = []


        if(images.length ===4){
          
          for(let i=0; i<images.length; i++){
            const result = await cloudinary.uploader.upload(images[i], {
               folder:'updateAquariumVariants',
               width:1920,
               crop:'scale'
             })
             
             imagesBuffer.push({
               public_id:result.public_id,
               url:result.secure_url
             })
             
            }
            data.images = imagesBuffer
            
        }else if (images.length > 4){

          
          for(let i=0; i<updateImages.length; i++){
         const result = await cloudinary.uploader.upload(updateImages[i], {
            folder:'updateAquariumVariants',
            width:1920,
            crop:'scale'
          })
          
          imagesBuffer.push({
            public_id:result.public_id,
            url:result.secure_url
          })
          
        }
        data.images = imagesBuffer
      }
          

        const listproducts = await addProduct.findOneAndUpdate(
          {slug:data.slugName},
          {$set:data},
          )
          
          res.status(201).json({
            success:true,
            listproducts
          })
            
      
   
   
    }catch(err){
      console.log(err)
    }
    
  })
  
  
  
  module.exports = productRouter