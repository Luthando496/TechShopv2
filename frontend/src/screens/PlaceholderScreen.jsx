import React,{useEffect} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {Row,Col,ListGroup,Card,Button,Image} from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import { Notyf } from 'notyf';
import Message from '../components/Message'
import Loader from '../components/Loader'
import {clearCartItems} from '../store/actions/cartActions'
import {createOrder} from '../store/actions/orderActions'


const PlaceholderScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {loading,error,orders} = useSelector(state => state.order)
    const notyf = new Notyf({position:{
        x: 'center',
        y: 'top'
    }});


    
    useEffect(()=>{
        if(!cart.shippingAddress){
            navigate('/shipping')
        }else if(!cart.PaymentMethod){
            navigate('/payment')
        }

        if(orders?.user){
            navigate(`/order/${orders._id}`)
        }
    },[cart.shippingAddress,cart.PaymentMethod,navigate,orders])

        const placeOrderHandler = ()=>{
            try{
                dispatch(createOrder({orderItems:cart.items,shippingAddress:cart.shippingAddress,paymentMethod:cart.PaymentMethod,shippingPrice:cart.shippingPrice,totalPrice:cart.totalPrice,itemsPrice:cart.itemsPrice,taxPrice:cart.taxPrice}))
                notyf.success('order created')
                dispatch(clearCartItems())


            }catch(error){
                console.log(error?.response?.data?.message)
                notyf.error(error)

            }

        }
  return (
    <>
        <CheckoutSteps step1 step2 step3 step4 />

        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Address:</strong>{cart.shippingAddress.address}, {cart.shippingAddress.city},{cart.shippingAddress.postalCode},{cart.shippingAddress.country}</p>

                    </ListGroup.Item>
                    <ListGroup.Item>
                    <h2>Payment Method</h2>

                    <strong>Method: </strong>
                    {cart.PaymentMethod}

                    </ListGroup.Item>

                    <ListGroup.Item>
                    <h2>Order Items</h2>

                    {cart.items.length === 0 ? (
                        <Message>Your Cart Is Empty</Message>
                    ) : (
                        <ListGroup variant="flush">
                                                    {cart.items.map(item => (
                                                        <ListGroup.Item key={item._id}>
                                                            <Row>
                                                                <Col>
                                                                    <Image src={item.image} alt={item.name} width="100px" height="100px" />
                                                                </Col>
                                                                <Col>
                                                                    <h3>{item.name}</h3>
                                                                    <p>Quantity: {item.quantity}</p>
                                                                    <p>{item.qty} X {item.price} = ZAR {item.qty * item.price}</p>
                                                                </Col>
                                                            </Row>
                                                        </ListGroup.Item>
                                    ))}
                        </ListGroup>
                    )}

                    </ListGroup.Item>

                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Col>
                                Items:
                            </Col>
                            <Col>
                                ZAR {cart.itemsPrice}
                            </Col>
                        </Row>
                        
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Col>
                                Shipping:
                            </Col>
                            <Col>
                                ZAR {cart.shippingPrice}
                            </Col>
                        </Row>
                        
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Col>
                                Tax:
                            </Col>
                            <Col>
                                ZAR {cart.taxPrice}
                            </Col>
                        </Row>
                        
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Col>
                                Total:
                            </Col>
                            <Col>
                                ZAR {cart.totalPrice}
                            </Col>
                        </Row>
                        
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cart.items.length === 0} onClick={placeOrderHandler}>Place Order</Button>
                            {loading && <Loader />}
                        </ListGroup.Item>
                    </ListGroup>

                </Card>
            </Col>
        </Row>
    </>
  )
}

export default PlaceholderScreen