import React,{useState,useEffect} from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import {Form,Col,Row,Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {useSelector,useDispatch} from 'react-redux'
import {loginUser} from '../store/actions/userActions'
import {toast} from 'react-toastify'
import Loader from '../components/Loader'
import { Notyf } from 'notyf';

const LoginScreen = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user,loading,error} = useSelector(state => state.user)
    const notyf = new Notyf({position:{
        x: 'center',
        y: 'top'
    }});

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
        dispatch(loginUser({email,password}))
        notyf.success('logged in successfully')
        navigate(redirect)

        if(error){
            notyf.error(error)
        }

        
    }

  return (
    <FormContainer>
        <h1>Sign In</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group className='my-3' controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className='my-3' controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Button disabled={loading} className='my-4' onClick={handleSubmit} variant="primary" type="submit">Sign In</Button>

                {loading && <Loader />}
            </Form>

            <Row>
                <Col>
                Don't Have A Login? {'  '}
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                       Sign Up
                    </Link>
                </Col>
            </Row>
    </FormContainer>
  )
}

export default LoginScreen