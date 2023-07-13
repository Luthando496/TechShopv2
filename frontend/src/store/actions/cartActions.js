import {cartAction} from '../cartReducer'

export const addCart =(product)=>{
    return dispatch=>{
        dispatch(cartAction.addToCart(product))
    }
}


export const removeCart =(product)=>{
    return dispatch=>{
        dispatch(cartAction.removeItem(product))
    }
}