const {GraphQLObjectType,GraphQLInputObjectType,GraphQLEnumType,GraphQLString,GraphQLFloat,GraphQLBoolean,GraphQLID,GraphQLInt,GraphQLList,GraphQLNonNull} = require('graphql')
const ProductType = require('./Types/ProductTypes')
const ordersType = require('./Types/OrdersType')
const Orders = require('../Schema/Orders')
const addProduct = require('../Schema/addProduct')

    //create products 

    const imageDetail = new GraphQLInputObjectType({
        name:'ImageDetail',
        fields: () => ({
            url:{type:GraphQLString},
            _id:{type:GraphQLID}
        })
    })
    
    const imagesDetail = new GraphQLInputObjectType({
        name:'ImagesDetail',
        fields: () => ({
            url:{type:GraphQLString},
            _id:{type:GraphQLID}
        })
    })
    
    const variantsDetail = new GraphQLInputObjectType({
        name:'VariantsDetail',
        fields:() => ({
            packaging: {type: GraphQLString},
            price:{type:GraphQLString},
            quantity:{type:GraphQLString},
            _id:{type:GraphQLID}
        })
    })
    
    const colorDetail = new GraphQLInputObjectType({
        name:'ColorDetail',
        fields: () => ({
            colors:{type:GraphQLString},
            quantity:{type:GraphQLInt},
            _id:{type:GraphQLID}
        })
    })
    
    const featureDetails = new GraphQLInputObjectType({
        name:'FeatureDetails',
        fields: () => ({
            _id:{type:GraphQLID},
            featureDetails: {type:GraphQLString}
        })
    })



//mutation
const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        products:{
            type:ProductType,
            args:{
                slug:{type:GraphQLString},
                title:{type:GraphQLString},
                category:{type:GraphQLString},
                description:{type:GraphQLString},
                Company:{type:GraphQLString},
                price:{type:GraphQLString},
                quantity:{type:GraphQLString},
                position:{type:GraphQLString},
                difficulty:{type:GraphQLString},
                image:{type:imageDetail},
                images:{type:new GraphQLList(imagesDetail)},
                colors:{type:new GraphQLList(colorDetail)},
                variants:{type:new GraphQLList(variantsDetail)},
                details:{type:new GraphQLList(featureDetails)},
                CompanyProductName:{type:GraphQLString},
            },
            resolve(parent,args){

                const product = new addProduct({
                    slug:args.slug,
                    title:args.title,
                    category:args.category,
                    description:args.description,
                    image:args.image,
                    images:args.images,
                    Company:args.Company,
                    price:args.price,
                    quantity:args.quantity,
                    variants:args.variants,
                    colors:args.colors,
                    details:args.details,
                    position:args.position,
                    difficulty:args.difficulty,
                    CompanyProductName:args.CompanyProductName,
                })
                return product.save()
            }
        },
        updateProduct:{
            type:ProductType,
            args:{
                slug:{type:GraphQLString},
                title:{type:GraphQLString},
                description:{type:GraphQLString},
                price:{type:GraphQLString},
                quantity:{type:GraphQLString},
                image:{type:imageDetail},
                images:{type:new GraphQLList(imagesDetail)},
                variants:{type:new GraphQLList(variantsDetail)},
                details:{type:new GraphQLList(featureDetails)},
                colors:{type:new GraphQLList(colorDetail)}
            },
            resolve(parent,args){
                return addProduct.findOneAndUpdate(
                    {slug: args.slug},
                    {
                        $set:{
                            title:args.title,
                            description:args.description,
                            price:args.price,
                            quantity:args.quantity,
                            colors:args.colors,
                            details:args.details,
                            variants:args.variants,
                            image:args.image,
                            images:args.images
                        }
                    },
                    {new:true}
                )
            }
        },
        deleteProducts:{
            type:ProductType,
            args:{
                _id:{type:GraphQLID}
            },
            resolve(parent,args){
                return addProduct.findOneAndRemove({_id:args._id})
            }
        },
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
        deleteOrders:{
            type:ordersType,
            args:{
                orderId:{type:GraphQLString},
            },
            resolve(parent,args){
                return Orders.findOneAndRemove({orderId:args.orderId})
            }
        },
    }
})


module.exports = mutation

