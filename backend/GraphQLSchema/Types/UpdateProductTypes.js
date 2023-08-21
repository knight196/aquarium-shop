const {GraphQLObjectType,GraphQLList,GraphQLFloat,GraphQLString,GraphQLID,GraphQLInt} = require('graphql')

//Get Product
const updateProductTypes = new GraphQLObjectType({
    name:'updateProduct',
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
        image: { type: imageUpdate },
        images: { type: new GraphQLList(imagesUpdate) },
        details: { type: new GraphQLList(featureDetailsUpdates) },
        variants: { type: new GraphQLList(variantsDetailUpdate) },
        colors: { type: new GraphQLList(colorDetailUpdate) }
    })
})

const imageUpdate = new GraphQLObjectType({
    name:'ImageUpdate',
    fields: () => ({
        url:{type:GraphQLString},
        _id:{type:GraphQLID}
    })
})

const imagesUpdate = new GraphQLObjectType({
    name:'ImagesUpdate',
    fields: () => ({
        url:{type:GraphQLString},
        _id:{type:GraphQLID}
    })
})

const variantsDetailUpdate = new GraphQLObjectType({
    name:'VariantsDetailUpdate',
    fields:() => ({
        packaging: {type: GraphQLString},
        price:{type:GraphQLString},
        quantity:{type:GraphQLString},
        _id:{type:GraphQLID}
    })
})

const colorDetailUpdate = new GraphQLObjectType({
    name:'ColorDetailUpdate',
    fields: () => ({
        colors:{type:GraphQLString},
        quantity:{type:GraphQLString},
        _id:{type:GraphQLID}
    })
})

const featureDetailsUpdates = new GraphQLObjectType({
    name:'FeatureDetailsUpdate',
    fields: () => ({
        _id:{type:GraphQLID},
        featureDetails: {type:GraphQLString}
    })
})

module.exports = updateProductTypes