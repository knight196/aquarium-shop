const express = require('express')
const addRating = require('../Schema/ReviewProduct')


const productRouter = express.Router()


productRouter.post('/ratingProduct', async (req,res) => {

const {image,slug,name,location,email,selectedrating,reviewTitle,reviewBody} = req.body

try{

const listReview = await addRating.create({
    image,slug,name,location,email,selectedrating,reviewTitle,reviewBody,
})


res.status(200).json({listReview})

}catch(err){
    res.status(404).send(err)
}

})

productRouter.post('/getReview', async (req,res) => {

const reviewSlug = req.body.slug

  addRating.find((err,result) => {

    if(err){
        console.log(err)
    }else{
        const findReview = result.filter((review) => review.slug === reviewSlug)
        res.status(200).send(findReview)
    }

  })

})


productRouter.post('/getUserReview', async (req,res) => {

const userReview = req.body.email

addRating.find((err,result) => {

if(err){
  console.log(err)
}else{
  const findUserReview = result.filter((review) => review.email === userReview)
  res.status(200).send(findUserReview)
}

})

})

productRouter.delete('/deleteReview/:id',async (req,res) => {

try{

  const deleteReview = await addRating.findOneAndDelete(
    {_id:req.params.id}
  )

  res.status(200).send(deleteReview)
  
}catch(err){
  res.status(500).send(err)
}

})


module.exports = productRouter