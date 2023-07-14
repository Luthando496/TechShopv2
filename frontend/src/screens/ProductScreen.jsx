import React,{useEffect,useState} from 'react'
import {useParams,Link,useNavigate} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Card,Button,Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import {singleProduct} from '../store/actions/productActions.js'
import {useDispatch,useSelector} from 'react-redux'
import {addCart} from '../store/actions/cartActions.js'
import Loader from '../components/Loader'
// add

const ProductScreen = () => {

    const {id} = useParams()
    const navigate = useNavigate()
    const [qty,setQty] = useState(1)

    const product= useSelector(state => state.prod.products)
    const {loading,error}= useSelector(state => state.prod.products)
  const dispatch = useDispatch()

  const addToCartHandler =()=>{
    dispatch(addCart({...product,qty}))
    navigate('/cart')
  }

  useEffect(()=>{
    dispatch(singleProduct(id))

  },[dispatch])


  return (
    <>
        <Link to='/' className="btn btn-light my-3">
            Go Back
        </Link>
        {loading ? (<Loader />) : error ? <h1>{error?.data?.message}</h1> : (
            <Row>
            <Col md={5}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
               <ListGroup varient='flush'>
                <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </ListGroup.Item>

                <ListGroup.Item>Description:{product.description}</ListGroup.Item>
               </ListGroup>
            </Col>
            <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Price:
                            </Col>
                            <Col>
                                <strong>{product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Status:
                            </Col>
                            <Col>
                                <strong>{product.countInStock > 0 ? 'In Stock': 'Out Of Stock'}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Qty:
                                </Col>
                                <Col>
                                <Form.Control as='select' value={qty} onChange={(e)=> setQty(Number(e.target.value))}>
                                {[...Array(product.countInStock).keys()].map(x => (
                                    <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                    </option>
                                ))}

                                </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                        <Button onClick={addToCartHandler} className="btn-block" disabled={product.countInStock === 0} variant="outline-dark">
                        Add To Cart
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
            </Col>
        </Row>
        )}
        
    </>
  )
}

export default ProductScreen