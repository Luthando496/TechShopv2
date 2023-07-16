import express from 'express'
const router = express.Router()
import {getMyOrders,getOrderByID,getOrders,updateOrderToDelivered,updateOrderToPaid,addOrderItems} from '../controllers/OrderController.js'
import {protect,admin} from '../middleware/authMiddleware.js'


router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders)
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id').get(protect,admin,getOrderByID)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect,admin,updateOrderToPaid)


export default router;