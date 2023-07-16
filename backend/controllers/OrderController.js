import asyncHandler from '../middleware/asyncHandler.js'
import Order from '../models/OrderModel.js'



// create new order
// @route Post api/orders
// @access Private
const addOrderItems = asyncHandler(async(req,res)=>{
    const {orderItems,shippingAddress, paymentMethod,taxPrice,shippingPrice,itemsPrice,totalPrice} = req.body

    if(orderItems && orderItems.length === 0){
       res.status(400)
       throw new Error('No order items')
    }else{
        const order = await Order.create({
            orderItems:orderItems.map(x => ({
                ...x,
                product:x.product._id,
                _id:undefined
            })),
            shippingAddress,
            paymentMethod,
            taxPrice,
            shippingPrice,
            itemsPrice,
            totalPrice
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
    
})



// get users orders
// @route GET api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async(req,res)=>{

    const orders = await Order.find({user:req.user._id})

    res.status(200).json(orders)

    
})


// get order by ID
// @route GET api/orders/:id
// @access Private
const getOrderByID = asyncHandler(async(req,res)=>{
    
    const order = await Order.findById(req.params.id).populate('user','name email')

    if(order){
        res.status(200).json(order)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }

    
})


// update order to paid
// @route GET api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async(req,res)=>{

    
    res.send('UPDATE ORDER TO PAID')
})


// update order to delivered
// @route GET api/orders/:id/pay
// @access Private
const updateOrderToDelivered = asyncHandler(async(req,res)=>{

    
    res.send('UPDATE ORDER TO Delivered')
})


// update order to delivered
// @route GET api/orders
// @access Private
const getOrders = asyncHandler(async(req,res)=>{

    
    res.send('GEt All Orders')
})


export {addOrderItems,getMyOrders,getOrderByID,updateOrderToPaid,getOrders,updateOrderToDelivered}
