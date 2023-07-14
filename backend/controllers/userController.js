import User from '../models/userModel.js'
import asyncHandler from '../middleware/asyncHandler.js'
import generateToken from '../utils/token.js'


// Authenticating the user
// @route Post api/users/login
// @access Public
export const authUser = asyncHandler(async(req,res)=>{

    const {email,password} = req.body

    console.log(email,password)

    const user = await User.findOne({email})

    if(user && (await user.matchPasswords(password,user.password))){
        generateToken(res,user._id)

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

    const {name,email,password,isAdmin} = req.body

    const exists = await User.findOne({email})

    if(exists){
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({name,email,password,isAdmin})

    if(user){
        generateToken(res,user._id)

        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
    })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }


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


    const user = await User.findById(req.user._id)

    if(user){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }

})

// Update User Profiles
// @route PUT api/users/profile
// @access private
export const updateProfile = asyncHandler(async(req,res)=>{

    const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        
        if(req.body.password){
            user.password = req.body.password
        }
        
        const updatedUser = await user.save()
        
        res.status(200).json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        isAdmin:updatedUser.isAdmin
    })
}else{
    res.status(404)
    throw new Error('User not found')
}

        

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