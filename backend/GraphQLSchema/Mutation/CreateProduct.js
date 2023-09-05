const {GraphQLInputObjectType,GraphQLID,GraphQLString,GraphQLFloat,GraphQLList,GraphQLInt} = require('graphql');
const addProduct = require('../../Schema/addProduct')
const ProductType = require('../Types/ProductTypes')
const updateProductTypes = require('../Types/UpdateProductTypes')

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
        quantity:{type:GraphQLString},
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



const ProductMutation = {
    products:{
        type:ProductType,
        args:{
            slug:{type:GraphQLString},
            title:{type:GraphQLString},
            category:{type:GraphQLString},
            description:{type:GraphQLString},
            Company:{type:GraphQLString},
            price:{type:GraphQLFloat},
            quantity:{type:GraphQLInt},
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
        type:updateProductTypes,
        args:{
            slug:{type:GraphQLString},
            title:{type:GraphQLString},
            description:{type:GraphQLString},
            price:{type:GraphQLFloat},
            quantity:{type:GraphQLInt},
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

}

module.exports = {ProductMutation}