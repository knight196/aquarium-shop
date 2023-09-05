const {GraphQLObjectType} = require('graphql')

const {ProductUpdateFields: ProductUpdateMutation} = require('./ProductUpdateMutation')
const {ordersMutation: ordersMutation} = require('./OrdersMutation')
const {ProductMutation: createProductMutation} = require('./CreateProduct')


//mutation
const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
    ...ProductUpdateMutation,...ordersMutation,...createProductMutation
    }
})


module.exports = mutation