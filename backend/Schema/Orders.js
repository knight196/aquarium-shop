const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
  username:String,
  subtotal:Number,
  amount: Number,
  products: Array,
  email: String,
  address: Object,
  paymentCreate:Array,
  orderId:String,
  deliveryOptions:String,
  deliveryPrice:Number,
  deliveryDate:String,
  paymentConfirm:String,
  Cancel:{type:Boolean,default:false},
  Refund:{type:Boolean,default:false},
  Delivered:{type:Boolean,default:false},
  Return:{type:Boolean,default:false},
  Dispatch:{type:Boolean,default:false}
},
{
  timestamps:true
}
);

module.exports = mongoose.model("orders", OrderSchema);