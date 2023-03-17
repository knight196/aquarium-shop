export const initialState={
    basket:JSON.parse(localStorage.getItem('basket') || '[]'),
    user: JSON.parse(localStorage.getItem("user")),
    address:JSON.parse(localStorage.getItem('address') || '{}'),
    deliveryOptions:JSON.parse(localStorage.getItem('deliveryOptions') || '[]') ,
}


//selector
export const getBasketTotal = (basket) => basket?.reduce((amount,item)=> item.price + amount , 0)



const reducer = (state, action) => {
  
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket:[...state.basket, action.item]
            };

            case  'EMPTY_BASKET':
                return{
                    ...state,
                    basket:[]
                }

            case "REMOVE_FROM_BASKET":
              const index = state.basket.findIndex(
                (basketItem)=> basketItem.slug === action.slug
              )

            let newBasket = [...state.basket];


            if(index >= 0){
                newBasket.splice(index,1)
            }else{
            
            }

                return{
                    ...state,
                    basket:newBasket
                }

                    case "SET_ADDRESS":
                        return{
                            ...state,
                            address:{...action.item}
                        }

                        case 'SET_DELIVERY':
                            return{
                                ...state,deliveryOptions:action.payload
                            }
               
                
                case 'SET_USER':
                    return{
                        ...state,
                        user:action.user
                    }

                

                default:
                    return state;
    }
}

export default reducer;