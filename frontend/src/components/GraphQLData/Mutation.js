import {gql} from '@apollo/client'

const ProductDelete = gql`

mutation deleteProduct($_id:ID){
    deleteProducts(_id:$_id){
        _id
    }
}

`

const DeleteOrders = gql `

mutation deleteOrders($orderId: String){
    deleteOrders(orderId: $orderId){
        orderId
    }
}

`


//product stock
const decrementQty = gql `

mutation decrementProduct($slug:String){
decrementQuantity(slug:$slug){
  quantity
}
}

`

const incrementQty = gql`

mutation incrementProduct($slug:String){
  incrementQuantity(slug:$slug){
    quantity
  }
}

`

const removeProductQty = gql `

mutation removeProduct($slug:String $quantity:Int){
  removeProductQuantity(slug:$slug quantity:$quantity){
    quantity
  }
}

`

//plants stock

const Plantsdecrement = gql `

mutation decrementPlants($slug:String $_id:ID){
decrementPlants(slug:$slug _id:$_id){
  quantity
}
}

`

const PlantsIncrement = gql`

mutation incrementPlants($slug:String $_id:ID){
  incrementPlants(slug:$slug _id:$_id){
    quantity
  }
}

`

const removePlants = gql `

mutation removePlants($slug:String $_id:ID $quantity:Int){
  removePlants(slug:$slug _id:$_id quantity:$quantity){
    quantity
  }
}

`


const basketPlantsUpdate = gql `
mutation basketPlantsInc($slug:String, $_id:ID $quantity:Int){
  basketPlantsInc(slug:$slug _id:$_id quantity:$quantity){
    quantity
  }
}
`


//color stock

const ColorDecrement = gql `

mutation decrementColor($slug:String $_id:ID){
decrementColor(slug:$slug _id:$_id){
  quantity
}
}

`

const ColorIncrement = gql`

mutation incrementColor($slug:String $_id:ID){
  incrementColor(slug:$slug _id:$_id){
    quantity
  }
}

`

const removeColor = gql `

mutation removeColor($slug:String $_id:ID $quantity:Int){
  removeColor(slug:$slug _id:$_id quantity:$quantity){
    quantity
  }
}

`

const basketColorUpdate = gql`

mutation basketColorInc($slug:String $_id:ID $quantity:Int){
  basketColorInc(slug:$slug _id:$_id quantity:$quantity){
  quantity
  }
}

`


const updateProduct = gql`

mutation updateProduct(
  $slug:String 
  $description:String 
  $title:String
  $details:[FeatureDetails]
  $colors:[ColorDetail]
  $variants:[VariantsDetail]
  $price:String
  $quantity:String
  $image:ImageDetail
  $images:[ImagesDetail]
  ){
    updateProduct(
      slug:$slug
      title:$title
      description:$description
      price:$price
      quantity:$quantity
      details:$details
      colors:$colors
      variants:$variants
      image:$image
      images:$images
    ){
      slug
      title
      description
      price
      quantity
      colors{
        colors
        quantity
        _id
      }
      details{
        featureDetails
        _id
      }
      variants{
        packaging
        price
        quantity
        _id
      }
      image{
        public_id
        url
        _id
      }
      images{
        public_id
        url
        _id
      }
    }
  }

`



export {DeleteOrders,ProductDelete,incrementQty,decrementQty,removeProductQty,removePlants,Plantsdecrement,PlantsIncrement,removeColor,ColorDecrement,ColorIncrement,basketPlantsUpdate,basketColorUpdate,updateProduct}