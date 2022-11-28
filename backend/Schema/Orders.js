const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
  username:String,
  amount: Number,
  products: Array,
  email: String,
  address: Object,
  paymentCreate:Array,
  Cancel:{type:Boolean,default:false},
  Refund:{type:Boolean,default:false},
  Delivered:{type:Boolean,default:false},
  Return:{type:Boolean,default:false}
},
{
  timestamps:true
}
);

module.exports = mongoose.model("orders", OrderSchema);