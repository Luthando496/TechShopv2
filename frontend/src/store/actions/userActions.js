import axios from 'axios'
import {userAction} from '../userReducer'



export const getAllUsers = () => async dispatch => {
    try {
        dispatch(userAction.fetchRequest())
        const {data} = await axios.get('/api/users')
        dispatch(userAction.getAllUsers(data))
    } catch (error) {
        console.log(error)
    }
}


export const loginUser = (userlog) => async dispatch => {
    try {
        dispatch(userAction.fetchRequest())
        const {data} = await axios.post('/api/users/login',userlog)
        dispatch(userAction.loginUser(data))
    } catch (error) {
        console.log(error?.response?.data?.message)
        dispatch(userAction.FailError(error?.response?.data?.message))
    }
}


export const register = (userlog) => async dispatch => {
    try {
        dispatch(userAction.fetchRequest())
        const {data} = await axios.post('/api/users',userlog)
        dispatch(userAction.registerUser(data))
    } catch (error) {
        console.log(error?.response?.data?.message)
        dispatch(userAction.FailError(error?.response?.data?.message))
    }
}



export const logout = () => async dispatch => {
    try {
        dispatch(userAction.fetchRequest())
        const {data} = await axios.post('/api/users/logout')
        dispatch(userAction.logout(data))
    } catch (error) {
        console.log(error?.response?.data?.message)
        dispatch(userAction.FailError(error?.response?.data?.message))
    }
}