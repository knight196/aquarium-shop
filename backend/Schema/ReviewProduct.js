const mongoose = require('mongoose')

const ProductReview = new mongoose.Schema(
    {
        image:String,
        slug:String,
        name:String,
        location:String,
        email:String,
        selectedrating:Number,
        reviewTitle:String,
        reviewBody:String
    },
    { timestamps: true }
)

const Review = mongoose.model('Review', ProductReview)

module.exports = Review