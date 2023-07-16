import {createSlice} from '@reduxjs/toolkit'



const orderSlice = createSlice({
    name: 'order',
    initialState: {orders:null,loading:false,error:null},
    reducers: {
    RequestOrder: (state, action) => {
        state.loading = true
    },
    createOrder: (state, action) => {
        state.loading = false
        state.orders = action.payload
    },
    FailOrder: (state, action) => {
        state.loading = false
        // state.error = action.payload
    }

    },

})


export const orderAction = orderSlice.actions
export const orderReducer = orderSlice.reducer