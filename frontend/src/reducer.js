export const initialState = {
    basket:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    user: JSON.parse(localStorage.getItem("user")),
    address: JSON.parse(localStorage.getItem('address') || '{}'),
    deliveryOptions: JSON.parse(localStorage.getItem('deliveryOptions') || '[]'),

}


//selector
export const qty = (basket) => basket?.reduce((a, c) => a + c.quantity, 0)
export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0)
export const getTotalBasketQty = (basket) => basket?.reduce((amount, item) => amount + item.price * item.quantity, 0)




const reducer = (state, action) => {

    switch (action.type) {
        case 'ADD_TO_BASKET':

        const newItem = action.item

        const existItem = state.basket.find(item => item.slug === newItem.slug)
        
    
          const cartItems = existItem ? state.basket.map(item => item.slug === existItem.slug ? newItem : item) :
          [...state.basket,newItem]

          localStorage.setItem('cartItems', JSON.stringify(cartItems))

          return {...state,newItem}



        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }

        case "REMOVE_FROM_BASKET": {

            const cartItems = state.basket.filter(item => item.slug !== action.item.slug)

            localStorage.setItem('cartItems', JSON.stringify(cartItems))

            return { ...state, basket: { ...state.basket, cartItems: [] } }

        }
        case "SET_ADDRESS":
            return {
                ...state,
                address: { ...action.item }
            }

        case 'SET_DELIVERY':
            return {
                ...state, deliveryOptions: action.payload
            }

 

        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }



        default:
            return state;
    }
}

export default reducer;