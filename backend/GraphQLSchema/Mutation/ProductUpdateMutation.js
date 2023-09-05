const {GraphQLObjectType, GraphQLList,GraphQLString,GraphQLInt,GraphQLFloat,GraphQLID} = require('graphql')
const ProductType = require('../Types/ProductTypes')
const addProduct = require('../../Schema/addProduct')

const ProductUpdateFields = {

 //products stock
 decrementQuantity:{
    type:ProductType,
    args:{
        slug:{type:GraphQLString}
    },  
    resolve(parent,args){
        return addProduct.findOneAndUpdate({slug:args.slug}, {$inc:{quantity:-1}})
    }
},
incrementQuantity:{
    type:ProductType,
    args:{
        slug:{type:GraphQLString},
    },
    resolve(parent,args){
        return addProduct.findOneAndUpdate({slug:args.slug}, {$inc:{quantity:1}})
    }
},
removeProductQuantity:{
    type:ProductType,
    args:{
        slug:{type:GraphQLString},
       quantity:{type:GraphQLInt}
    },
        resolve(parent,args){
            return addProduct.findOneAndUpdate({slug:args.slug}, {$inc:{quantity:args.quantity}})
        }
},
//plants stock
decrementPlants:{
    type:ProductType,
    args:{
        slug:{type:GraphQLString},
        _id:{type:GraphQLID}
    },
    resolve(parent,args){
       
       return addProduct.findOneAndUpdate({slug:args.slug,'variants._id':args._id},
        {$inc:{'variants.$.quantity':-1}})
    }
},
incrementPlants:{
    type:ProductType,
    args:{
        slug:{type:GraphQLString},
        _id:{type:GraphQLID}
    },
    resolve(parent,args){
        return addProduct.findOneAndUpdate({slug:args.slug,'variants._id': args._id},
        {$inc:{'variants.$.quantity':1}})
    }
},
removePlants:{
    type:ProductType,
    args:{
        slug:{type:GraphQLString},
        _id: {type:GraphQLID},
        quantity:{type:GraphQLInt}
    },
    resolve(parent,args){
        return addProduct.findOneAndUpdate({slug:args.slug,'variants._id':args._id},
        {$inc:{'variants.$.quantity': args.quantity}})
    }
},
basketPlantsInc:{
    type:ProductType,
    args:{
        slug:{type:GraphQLString},
        _id: {type:GraphQLID},
        quantity:{type:GraphQLInt}
    },
    resolve(parent,args){
        return addProduct.findOneAndUpdate({slug:args.slug,'variants._id':args._id},
        {$inc:{'variants.$.quantity': args.quantity}})
    }
},
//variants stock
decrementColor:{
    type:ProductType,
    args:{
        slug:{type:GraphQLString},
        _id:{type:GraphQLID}
    },
    resolve(parent,args){

        return addProduct.findOneAndUpdate({slug:args.slug, 'colors._id': args._id},
        {$inc:{'colors.$.quantity': -1}})
    }
},
incrementColor:{
    type:ProductType,
    args:{
        slug:{type:GraphQLString},
        _id:{type:GraphQLID}
    },
    resolve(parent,args){
        return addProduct.findOneAndUpdate({slug:args.slug, 'colors._id': args._id},
        {$inc:{'colors.$.quantity': 1}})
    }
},
removeColor:{
    type:ProductType,
    args:{
        slug:{type:GraphQLString},
        _id:{type:GraphQLID},
        quantity:{type:GraphQLInt}
    },
    resolve(parent,args){
        return addProduct.findOneAndUpdate({slug:args.slug, 'colors._id':args._id},
        {$inc:{'colors.$.quantity': args.quantity}}
        )
    }
},
basketColorInc:{
    type:ProductType,
    args: {
        slug:{type:GraphQLString},
        _id:{type:GraphQLID},
        quantity:{type:GraphQLInt}
    },
    resolve(parent,args){
        return addProduct.findOneAndUpdate({slug:args.slug, 'colors._id': args._id},
        {$inc:{'colors.$.quantity': args.quantity}}
        )
    }
},

}

module.exports = {ProductUpdateFields}