import express from 'express'
const router = express.Router()
import {authUser,registerUser,logoutUser,getProfile,updateProfile,getAllUsers,getUserById,updateUserByID,deleteUsers} from '../controllers/userController.js'
import {protect,admin} from '../middleware/authMiddleware.js'


router.route('/').get(protect,admin,getAllUsers).post(registerUser)
router.post('/logout',logoutUser)
router.post('/login',authUser)
router.route('/profile').get(protect,getProfile).put(protect,updateProfile)
router.route('/:id').delete(protect,admin,deleteUsers).get(protect,admin,getUserById).put(protect,admin,updateUserByID)


export default router;