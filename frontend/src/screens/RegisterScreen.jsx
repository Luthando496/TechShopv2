import React,{useState,useEffect} from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import {Form,Col,Row,Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {useSelector,useDispatch} from 'react-redux'
import {register} from '../store/actions/userActions'
import {toast} from 'react-toastify'
import Loader from '../components/Loader'
import { Notyf } from 'notyf';





const RegisterScreen = () => {
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [confirm,setConfirm] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user,loading,error} = useSelector(state => state.user)
    // Create an instance of Notyf
    const notyf = new Notyf({position:{
        x: 'center',
        y: 'top'
    }});
    
    // Display an error notification 
    

    const {search} = useLocation()

    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(()=>{
        if(user){
            navigate(redirect)
        }
    },[user,redirect])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password === confirm){
            const data = {email,password,name}
            dispatch(register(data))
            navigate(redirect)
            notyf.success('logged in successfully')
        }else{
            notyf.error('Passwords do not match')
        }

        
    }

  return (
    <FormContainer>
        <h1>Register</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group className='my-3' controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className='my-3' controlId="email">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" value={name} onChange={(e) => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group className='my-3' controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group className='my-3' controlId="password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={confirm} onChange={(e) => setConfirm(e.target.value)}/>
                </Form.Group>
                <Button disabled={loading} className='my-4' onClick={handleSubmit} variant="primary" type="submit">Sign In</Button>

                {loading && <Loader />}
            </Form>

            <Row>
                <Col>
                Already Have an Account ? {'  '}
                    <Link to={`/login`}>
                       Sign Up
                    </Link>
                </Col>
            </Row>
    </FormContainer>
  )
}

export default RegisterScreen