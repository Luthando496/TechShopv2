import express from 'express'
import asyncHandler from '../middleware/asyncHandler.js'
const router = express.Router()
import {getAllProducts,getProductById} from '../controllers/productsController.js'


router.route('/').get(getAllProducts)
router.route('/:id').get(getProductById)



export default router;