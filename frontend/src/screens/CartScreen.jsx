import React from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap'
import {FaTrash} from 'react-icons/fa'
import Message from '../components/Message'
import { useSelector,useDispatch } from 'react-redux'

const CartScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {items} = useSelector(state => state.cart)

    console.log(items)
  return (
    <Row>
        <Col md={8}>
            <h1 style={{marginBottom:'20px'}}>Shopping Cart</h1>
            {items.length === 0 ? (<Message>Your Cart Is Empty <Link to='/'>Go Back</Link></Message>) : (
                <ListGroup variant='flush'>
                    {items.map((item) => (
                        <ListGroup.Item key={item._id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>
                                    ${item.price}
                                </Col>
                                <Col md={2}>
                                <Form.Control as='select' value={item.qty} onChange={(e)=> {}}>
                                {[...Array(item.countInStock).keys()].map(x => (
                                    <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                    </option>
                                ))}

                                </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button variant='danger' onClick={() => dispatch({type: 'REMOVE_FROM_CART', payload: item})}>
                                        <FaTrash />
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Col>
    </Row>
  )
}

export default CartScreen