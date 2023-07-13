import {PRODUCTS_URL,USERS_URL,PAYPAYCONFIG,ORDERS_URL} from '../../constants.js'
import {productAction} from '../store.js'
import axios from 'axios'


export const getProducts = () =>
    async dispatch =>{
        try{
            const {data} = await axios.get(PRODUCTS_URL)

            dispatch(productAction.ProductsSuccess(data))

        }catch(err){
            console.log(err)
            dispatch(productAction.ProductsFail(err || err.response || err.response.data))
        }
}


export const singleProduct = (id) =>
    async dispatch =>{
        try{
            const {data} = await axios.get(`${PRODUCTS_URL}/${id}`)

            dispatch(productAction.ProductsSuccess(data))

        }catch(err){
            console.log(err)
            dispatch(productAction.ProductsFail(err || err.response || err.response.data))
        }
}




