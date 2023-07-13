import {cartAction} from '../cartReducer'

export const addCart =(product)=>{
    return dispatch=>{
        dispatch(cartAction.addToCart(product))
    }
}