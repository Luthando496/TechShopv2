import {createSlice} from '@reduxjs/toolkit'
import {updateCart} from '../utils/cartUtils'

const cartStore = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :[]
const shipStore = localStorage.getItem('ship') ? JSON.parse(localStorage.getItem('ship')) :{}



const addDecimals =(number)=>{
    return (Math.round(number * 100) / 100).toFixed(2)
}


const cartSlice = createSlice({
    name:'cart',
    initialState:{items:cartStore,itemsPrice:0,shippingPrice:0,taxPrice:0,totalPrice:0,shippingAddress:shipStore,PaymentMethod:'PayPal'},
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
            localStorage.setItem('ship',JSON.stringify(state.shippingAddress))
                
        },
        savePaymentMethod(state, action){
          state.PaymentMethod = action.payload
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
        }
        // addQty(state, action){}

    }
})


export const cartAction = cartSlice.actions
export const cartReducer = cartSlice.reducer