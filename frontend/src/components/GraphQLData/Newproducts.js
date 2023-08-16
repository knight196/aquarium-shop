import {gql} from '@apollo/client'

const addProducts = gql `


mutation addProduct(
    $slug:String
    $title:String
    $category:String
    $description:String
    $Company:String
    $price:String
    $quantity:String
    $position:String
    $difficulty:String
    $CompanyProductName:String
    $colors:[ColorDetail]
    $variants:[VariantsDetail]
    $details:[FeatureDetails]
    $image:ImageDetail
    $images:[ImagesDetail]
    ){
products(
slug:$slug
title:$title
category:$category
description:$description
Company:$Company
price:$price
quantity:$quantity
position:$position
difficulty:$difficulty
CompanyProductName:$CompanyProductName    
colors:$colors
variants:$variants
details:$details
image:$image
images:$images
){
slug
title
category
description
Company
price
quantity
position
difficulty
CompanyProductName
colors{
    colors
    quantity
}
variants{
    packaging
    price
    quantity
}
details{
    featureDetails
}
image{
    url
}
images{
    url
}
}
}


`

export {addProducts}
