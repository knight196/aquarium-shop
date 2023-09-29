import {gql,useQuery} from '@apollo/client'



const allOrders = gql `

query allOrders {
  orders {
    username,
    subtotal,
    amount,
    orderId,
    email,
    paymentCreate{
      card{
        last4,
        brand
      }
    },
    address {
      street
      city
      postcode
      phone
    },
    products {
      image {
        public_id
        url
      },
      title,
      price,
      quantity
    },
    paymentConfirm,
    deliveryDate,
    deliveryPrice,
    deliveryOptions,
    Cancel,
    Refund,
    Delivered,
    Dispatch,
    date
  }
}

`

const ordersArray = gql`

query singleOrders($orderId:String){
    ordersId(orderId:$orderId){ 
        username,
    subtotal,
    amount,
    orderId,
    email,
    paymentCreate{
      card{
        last4,
        brand
      }
    },
    address {
      street
      city
      postcode
      phone
    },
    products {
      image {
        public_id
        url
      },
      title,
      price,
      quantity
    },
    paymentConfirm,
    deliveryDate,
    deliveryPrice,
    deliveryOptions,
    Cancel,
    Refund,
    Delivered,
    Dispatch
    date
    TrackingNo
    }
}

`


const ordersEmail = gql `

query orderEmail($email:String){
  ordersByEmail(email:$email){
    username,
    subtotal,
    amount,
    orderId,
    email,
    paymentCreate{
      card{
        last4,
        brand
      }
    },
    address {
      street
      city
      postcode
      phone
    },
    products {
      image {
        public_id
        url
      },
      title,
      price,
      quantity
    },
    paymentConfirm,
    deliveryDate,
    deliveryPrice,
    deliveryOptions,
    Cancel,
    Refund,
    Delivered,
    Dispatch,
    date
    }
}

`

//update trackingNo
const updateTrackingNo = gql`

mutation updateTrackingNo($orderId:String $TrackingNo:String){

trackingUpdate(orderId:$orderId TrackingNo:$TrackingNo){
  TrackingNo
}

}

`

export {ordersArray,ordersEmail,allOrders,updateTrackingNo}