var mongoose = require('mongoose')

var addProductSchema = new mongoose.Schema(
    {
       slug:{type:String,required:true},
       title:{type:String},
       category:{type:String,required:true},
       description:{type:String},
       Company:{type:String},
       price:{type:Number},
       quantity:{type:Number},
       image:{
        url:{
            type:String,
        }
       },
       images:[{
        url:{
            type:String
        }
       }],
       position:{type:String},
       difficulty:{type:String},
       CompanyProductName:{type:String},
       details:[{featureDetails:{type:String}}],
       variants:[
        {
            packaging:{type:String},
            price:{type:Number},
            quantity:{type:Number}

    }
],
colors:[
    {
        colors:{type:String},
        quantity:{type:Number}
}
]
    },
    {
        timestamps:true
    }
)

//image is a model which has a schema newproducts

const Product = mongoose.model('newproducts', addProductSchema)
module.exports = Product