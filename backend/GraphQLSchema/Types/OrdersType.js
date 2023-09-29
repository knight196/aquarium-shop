const {GraphQLObjectType,GraphQLBoolean,GraphQLFloat,GraphQLString,GraphQLList} = require('graphql')

//orders added
    
 const ordersType = new GraphQLObjectType({
    name:'orders',
    fields: () => ({
        username:{type:GraphQLString},
        subtotal:{type:GraphQLFloat},
        amount:{type:GraphQLFloat},
        email:{type:GraphQLString},
        products:{type: new GraphQLList(ordersProduct)},
        address:{type:ordersAddress},
        paymentCreate:{type:new GraphQLList(ordersPaymentCreate)},
        orderId:{type:GraphQLString},
        deliveryOptions:{type:GraphQLString},
        deliveryPrice:{type:GraphQLFloat},
        deliveryDate:{type:GraphQLString},
        paymentConfirm:{type:GraphQLString},
        Cancel:{type:GraphQLBoolean,default:false},
        Refund:{type:GraphQLBoolean,default:false},
        Delivered:{type:GraphQLBoolean,default:false},
        Dispatch:{type:GraphQLBoolean,default:false},
        date:{type:GraphQLString},
        TrackingNo:{type:GraphQLString}
    })

})

const ordersImage = new GraphQLObjectType({
    name:'orderImage',
    fields:() => ({
        public_id:{type:GraphQLString},
        url:{type:GraphQLString},
    })
})

const ordersProduct = new GraphQLObjectType({
    name:'ordersProduct',
    fields:() => ({
        image:{type:ordersImage},
        title:{type:GraphQLString},
        price:{type:GraphQLString},
        quantity:{type:GraphQLFloat},
    })
})

const ordersAddress = new GraphQLObjectType({
name:'ordersAddress',
fields:() => ({
    street:{type:GraphQLString},
    city:{type:GraphQLString},
    postcode:{type:GraphQLString},
    phone:{type:GraphQLFloat},
})
})

const ordersPaymentCreate = new GraphQLObjectType({
    name:'ordersPaymentCreate',
    fields: () => ({
        card:{type:ordersCard}
    })
})

const ordersCard = new GraphQLObjectType({
    name:'ordersCard',
    fields:() => ({
        brand:{type:GraphQLString},
        last4:{type:GraphQLString}
    })
})

module.exports = ordersType