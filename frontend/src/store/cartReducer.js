import {createSlice} from '@reduxjs/toolkit'
import {updateCart} from '../utils/cartUtils'

const cartStore = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :[]



const addDecimals =(number)=>{
    return (Math.round(number * 100) / 100).toFixed(2)
}


const cartSlice = createSlice({
    name:'cart',
    initialState:{items:cartStore,itemsPrice:0,shippingPrice:0,taxPrice:0,totalPrice:0,shippingAddress:{},PaymentMethod:'PayPal'},
    reducers:{
        addToCart(state, action){
            const item = action.payload
            const existItem = state.items.find(p => p._id === item._id)

            if (existItem) {
                state.items = state.items.map((x) =>
                  x._id === existItem._id ? item : x
                );
              } else {
                state.items = [...state.items, item];
              }



              updateCart(state)
        
            localStorage.setItem('cart',JSON.stringify(state.items))

        },
        removeItem(state, action){
            // const id = action.payload
            // const exist = state.items.find(p => p.id === id)
            // if(exist.quantity === 1){
                state.items = state.items.filter(item => item._id !== action.payload)

                localStorage.setItem('cart',JSON.stringify(state.items))

            // }else{
            //     exist.quantity--
            // }
        },
        saveShippingAddress(state, action){
            state.shippingAddress = action.payload
            return updateCart(state)
        },
        // addQty(state, action){}

    }
})


export const cartAction = cartSlice.actions
export const cartReducer = cartSlice.reducer