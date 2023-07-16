import {orderAction} from '../orderReducer'
import axios from 'axios'
import {ORDERS_URL} from '../../constants'

export const createOrder =( order)=> async (dispatch) => {
    dispatch(orderAction.RequestOrder())
    // console.log(order)

    try{
        const {data} = await axios.post(ORDERS_URL,order)
        console.log(data)
        dispatch(orderAction.createOrder(data))

    }catch(error){
        console.log(error?.response?.data?.message)
        dispatch(orderAction.FailOrder(error?.response?.data?.message))
    }

}