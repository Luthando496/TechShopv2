import {createSlice} from '@reduxjs/toolkit'
import {updateCart} from '../utils/cartUtils'

const cartStore = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :[]



const addDecimals =(number)=>{
    return (Math.round(number * 100) / 100).toFixed(2)
}


const cartSlice = createSlice({
    name:'cart',
    initialState:{items:cartStore,itemsPrice:0,shippingPrice:0,taxPrice:0,totalPrice:0},
    reducers:{
        addToCart(state, action){
            const item = action.payload
            const exist = state.items.find(p => p.id === item.id)

            if(exist){
                exist.qty++
            }else{
                state.items = [...state.items,item]
            }


            state.itemsPrice = addDecimals(state.items.reduce((acc, item) =>  item.price * item.qty,0))

            // shipping price
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
        
            // Calculate the tax price
            state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
        
            // Calculate the total price
            state.totalPrice = (
                Number(state.itemsPrice) +
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            ).toFixed(2);
        
            localStorage.setItem('cart',JSON.stringify(state))

        },
        removeItem(state, action){
            const id = action.payload
            const exist = state.items.find(p => p.id === id)
            if(exist.quantity === 1){
                state.items = state.items.filter(item => item.id !== id)

            }else{
                exist.quantity--
            }
        },
        // addQty(state, action){}

    }
})


export const cartAction = cartSlice.actions
export const cartReducer = cartSlice.reducer