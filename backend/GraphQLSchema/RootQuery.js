const addProduct = require('../Schema/addProduct')
const Orders = require('../Schema/Orders')
const ProductType = require('./Types/ProductTypes')
const ordersType = require('./Types/OrdersType')

const {GraphQLSchema,GraphQLFloat,GraphQLID,GraphQLList,GraphQLString,GraphQLObjectType,GraphQLInt,GraphQLBoolean} = require('graphql')


const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        products:{
                type:new GraphQLList(ProductType),
                resolve(parent,args){
                return addProduct.find()
            }
        },
        product:{
            type:ProductType,
            args:{slug: {type:GraphQLString}},
            resolve(parent,args){
                return addProduct.findOne({slug: args.slug})
            }
        },
        image:{
            type:ProductType,
            resolve(parent,args){
            return addProduct.map(item => item.image)
            }
        },
        images:{
            type:ProductType,
            resolve(parent,args){
              return addProduct.images.map(item => item.images)
            }
        },
        variants:{
            type:ProductType,
            resolve(parent,args){
                return addProduct.variants.map(item => item.variants)
            }
        },
        colors:{
            type:ProductType,
            resolve(parent,args){
                return addProduct.images.map(item => item.images)
            }
        },
        details:{
            type:ProductType,
            resolve(parent,args){
               return addProduct.details.map(item => item.details)
            }
        },
        //orders
        orders:{
            type:new GraphQLList(ordersType),
            resolve(parent,args){
                return Orders.find()
            }
        },
        ordersByEmail:{
            type:new GraphQLList(ordersType),
            args:{
                email:{type:GraphQLString}
            },
            resolve(parent,args){
                return Orders.find({email:args.email})
            }
        },
        ordersId:{
            type:ordersType,
            args:{orderId: {type:GraphQLString}},
            resolve(parent,args){
                return Orders.findOne({orderId:args.orderId})
            }
        },
    },
})


module.exports = RootQuery