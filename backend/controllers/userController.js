import User from '../models/userModel.js'
import asyncHandler from '../middleware/asyncHandler.js'
import jwt from 'jsonwebtoken'


// Authenticating the user
// @route Post api/users/login
// @access Public
export const authUser = asyncHandler(async(req,res)=>{

    const {email,password} = req.body

    console.log(email,password)

    const user = await User.findOne({email})

    if(user && (await user.matchPasswords(password,user.password))){
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{
            expiresIn:'30d'
        })

        res.cookie('jwt',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV !== 'development',
            sameSite:'strict',
            maxAge:30 * 24 * 60 * 60 * 1000
        })

        res.json({_id:user._id,name:user.name,email:user.email,isAdmin:user.isAdmin})

    }else{
        res.status(401)
        throw new Error('Invalid Email or Password')
    }

    
})


// / Register User
// @route Post api/users/register
// @access Public
export const registerUser = asyncHandler(async(req,res)=>{

    res.send('register user')

})


// Logout User
// @route Post api/users/logout
// @access Public
export const logoutUser = asyncHandler(async(req,res)=>{

    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })

    res.status(200).json({message:'logged out successfully'})

})

// Get User Profiles
// @route GET api/users/profile
// @access private
export const getProfile = asyncHandler(async(req,res)=>{

    res.send('get user profile')

})

// Update User Profiles
// @route PUT api/users/profile
// @access private
export const updateProfile = asyncHandler(async(req,res)=>{

    res.send('update user profile')

})

// Get All Users
// @route PUT api/users
// @access admin
export const getAllUsers = asyncHandler(async(req,res)=>{

    res.send('get all users')

})

// Get  Users by ID
// @route PUT api/users
// @access admin
export const getUserById = asyncHandler(async(req,res)=>{

    res.send('get all users')

})

// Get  Users by ID
// @route PUT api/users/:id
// @access admin
export const updateUserByID = asyncHandler(async(req,res)=>{

    res.send('get all users')

})
// Delete Users
// @route DELETE api/users/:id
// @access admin
export const deleteUsers = asyncHandler(async(req,res)=>{

    res.send('get all users')

})