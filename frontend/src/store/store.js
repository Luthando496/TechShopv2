import {configureStore,createSlice} from '@reduxjs/toolkit';
import {cartReducer} from './cartReducer'




const productSlice = createSlice({
    name:'product',
    initialState:{products:[],loading:false,error:null },
    reducers:{
        allProductsRequest(state, action){
            state.loading =true
        },
        ProductsSuccess(state, action){
            state.products =action.payload
            state.loading = false
        },
        ProductsFail(state, action){
            state.er =action.payload
            state.loading =false
            state.products = []
        },
        // newProduct(state, action){
        //     state.newProd = action.payload
        //     state.proErr = null
        //     state.proLoad = false
        // },
        // newProdFail(state, action){
        //     state.newProd = {}
        //     state.proErr = action.payload
        //     state.proLoad = false
        // }

    }
})


export const productAction = productSlice.actions

const store = configureStore({
    reducer:{
        prod:productSlice.reducer,
        cart:cartReducer,
    //     det:productDetailsSlice.reducer,
    //     auth:authReducer.reducer,
    //     ship:ShipReducer
    }
})


export default store