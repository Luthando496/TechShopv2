import React,{useState,useEffect} from 'react'
import {Col,Form,Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { useDispatch,useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {saveShipping} from '../store/actions/cartActions'


const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {shippingAddress} = useSelector((state) => state.cart)

    useEffect(()=>{

        if(!shippingAddress){
            navigate('/shipping')
        }

    },[shippingAddress,navigate])

    const submitHandler =(e)=>{
        e.preventDefault();
        navigate('/placeorder')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />

        <h1>Payment Method</h1>

        <Form onSubmit={submitHandler}>
            <Form.Group  >
                <Form.Label as='legend'>Payment Method</Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id='PayPal'
                        className='my-4'
                        name='paymentMethod'
                        value='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >

                    </Form.Check>
                    
                </Col>
            </Form.Group>
            <Button variant='primary' type='submit'>
                Proceed
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen