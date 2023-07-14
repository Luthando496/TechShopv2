import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch,useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {saveShipping} from '../store/actions/cartActions'

const ShippingScreen = () => {
    const {shippingAddress} = useSelector(state=> state.cart)

    const [address,setAddress] = useState(shippingAddress?.address || '')
    const [city,setCity] = useState(shippingAddress?.city || '')
    const [postalCode,setCode] = useState(shippingAddress?.postalCode || '')
    const [country,setCountry] = useState(shippingAddress?.country || '')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit =()=>{
        const data = {address,city,postalCode,country}
        dispatch(saveShipping(data))
        navigate('/payment')

    }
  return (
    <FormContainer>
        <h1>Shipping</h1>

        <Form onSubmit={onSubmit}>
            <Form.Group controlId="address" className='my-4'>
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Enter address" value={address} onChange={(e)=>setAddress(e.target.value)} />
            </Form.Group>
            <Form.Group className='my-4' controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Enter city" value={city} onChange={(e)=>setCity(e.target.value)} />
            </Form.Group>
            <Form.Group className='my-4' controlId="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type="text" placeholder="Enter postal code" value={postalCode} onChange={(e)=>setCode(e.target.value)} />
            </Form.Group>
            <Form.Group className='my-4' controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" placeholder="Enter country" value={country} onChange={(e)=>setCountry(e.target.value)} />
            </Form.Group>

            <Button className='my-5' variant="secondary" type="submit">
                Proceed
            </Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen