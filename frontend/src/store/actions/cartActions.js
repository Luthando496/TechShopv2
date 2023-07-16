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


export const clearCartItems =(product)=>{
    return dispatch=>{
        dispatch(cartAction.clearCart())
    }
}


export const payment =(product)=>{
    return dispatch=>{
        dispatch(cartAction.savePaymentMethod(product))
    }
}