import {createSlice} from '@reduxjs/toolkit'


const userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const userSlice = createSlice({
    name: 'user',
    initialState: {user:userInfo,users:[],loading:false,error:null},
    reducers: {
        fetchRequest: (state, action) => {
            state.loading = true
        },
        getAllUsers: (state, action) => {
            state.users = action.payload
            state.loading = false
        },
        loginUser: (state, action) => {
            state.user = action.payload
            state.loading = false
            localStorage.setItem('user', JSON.stringify(state.user))
        },
        registerUser: (state, action) => {
            state.user = action.payload
            state.loading = false
            localStorage.setItem('user', JSON.stringify(state.user))
        },
        FailError: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        logout: (state, action) => {
            state.user = null;
            state.loading  = false;

            localStorage.removeItem('user')
        }

    }
})



export const userAction = userSlice.actions
export const userReducer = userSlice.reducer