const {GraphQLObjectType,GraphQLList,GraphQLFloat,GraphQLInt,GraphQLString,GraphQLID,GraphQLNonNull} = require('graphql')

//Get Product
const ProductType = new GraphQLObjectType({
    name:'GetProduct',
    fields: () => ({
        _id:{type:GraphQLID},
        slug: { type: GraphQLString },
        title: { type: GraphQLString },
        category: { type: GraphQLString },
        description: { type: GraphQLString },
        Company: { type: GraphQLString },
        price: { type: GraphQLFloat },
        quantity: { type: GraphQLInt },
        position: { type: GraphQLString },
        difficulty: { type: GraphQLString },
        CompanyProductName: { type: GraphQLString },
        image: { type: imageDetail },
        images: { type: new GraphQLList(imagesDetail) },
        details: { type: new GraphQLList(featureDetails) },
        variants: { type: new GraphQLList(variantsDetail) },
        colors: { type: new GraphQLList(colorDetail) }
    })
})

const imageDetail = new GraphQLObjectType({
    name:'imagedetail',
    fields: () => ({
        public_id:{type:GraphQLString},
        url:{type:GraphQLString},
        _id:{type:GraphQLID}
    })
})

const imagesDetail = new GraphQLObjectType({
    name:'imagesdetail',
    fields: () => ({
        public_id:{type:GraphQLString},
        url:{type:GraphQLString},
        _id:{type:GraphQLID}
    })
})

const variantsDetail = new GraphQLObjectType({
    name:'variantsdetail',
    fields:() => ({
        packaging: {type: GraphQLString},
        price:{type:GraphQLString},
        quantity:{type:GraphQLString},
        _id:{type:GraphQLID}
    })
})

const colorDetail = new GraphQLObjectType({
    name:'colordetail',
    fields: () => ({
        colors:{type:GraphQLString},
        quantity:{type:GraphQLString},
        _id:{type:GraphQLID}
    })
})

const featureDetails = new GraphQLObjectType({
    name:'featureDetails',
    fields: () => ({
        _id:{type:GraphQLID},
        featureDetails: {type:GraphQLString}
    })
})

module.exports = ProductType