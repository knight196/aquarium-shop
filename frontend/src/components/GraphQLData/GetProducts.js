import { gql } from '@apollo/client'


const GetProducts = gql`

query getProducts {
    products{
  _id,
    slug,
    title,
    description,
    category,
    Company,
    price,
    quantity,
    difficulty,
    position,
    CompanyProductName,
    details{
        featureDetails
    },
    image {
      url
      _id
    },
    quantity,
    images{
      url
      _id
    },
    variants{
      packaging,
      price,
      quantity
    },
    colors 
    {
      colors
      quantity
    },
  }
}

`



const singleProduct = gql `

query getProduct($slug:String){
  product(slug: $slug){
  slug,
    title,
    description,
    category,
    CompanyProductName,
    difficulty,
    position,
    price,
    Company,
    quantity,
    details{
      featureDetails
    },
    image{
      url
    },
    images{
      url
    },
    colors{
      colors,
      quantity,
      _id
    },
    variants{
      packaging,
      price,
      quantity,
      _id
    },
  }
}

`
export {GetProducts,singleProduct}