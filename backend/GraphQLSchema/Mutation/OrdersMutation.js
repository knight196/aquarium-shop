const {GraphQLID,GraphQLString} = require('graphql')
const Orders = require('../../Schema/Orders')
const ProductType = require('../Types/ProductTypes')
const ordersType = require('../Types/OrdersType')
const addProduct = require('../../Schema/addProduct')


const ordersMutation = {
    deleteProducts:{
        type:ProductType,
        args:{
            _id:{type:GraphQLID}
        },
        resolve(parent,args){
            return addProduct.findOneAndRemove({_id:args._id})
        }
    },
   
    deleteOrders:{
        type:ordersType,
        args:{
            orderId:{type:GraphQLString},
        },
        resolve(parent,args){
            return Orders.findOneAndRemove({orderId:args.orderId})
        }
    }
}

module.exports = {ordersMutation}