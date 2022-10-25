const { truncate } = require('fs')
var mongoose = require('mongoose')

var addProductSchema = new mongoose.Schema(
    {
       slug:{type:String,required:true},
       title:{type:String,required:true},
       category:{type:String,required:true},
       description:{type:String},
       Company:{type:String},
       price:{type:Number},
       image:{
        public_id:{
            type:String,
            require:true
        },
        url:{
            type:String,
            required:true
        }
       },
       position:{type:String},
       difficulty:{type:String},
       CompanyProductName:{type:String},
       details:[{featureDetails:{type:String}}],
    },
    {
        timestamps:true
    }
)

//image is a model which has a schema newproducts

const Product = mongoose.model('newproducts', addProductSchema)
module.exports = Product