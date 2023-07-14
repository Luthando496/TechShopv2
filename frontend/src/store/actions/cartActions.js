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



export const saveShipping =(product)=>{
    return dispatch=>{
        dispatch(cartAction.saveShippingAddress(product))
    }
}