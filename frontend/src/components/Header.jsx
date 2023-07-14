import {Navbar,Nav,Container,Badge,NavDropdown } from "react-bootstrap"
import {FaShoppingCart,FaUser} from "react-icons/fa"
import logo from '../assets/techno.png'
import {LinkContainer} from 'react-router-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import {logout} from '../store/actions/userActions'
import { useNavigate } from "react-router-dom"


const Header = () => {

    const {items} = useSelector(state => state.cart)
    const {user} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler=()=>{
      dispatch(logout())
      navigate('/login')
    }

  return (
    <header>
        <Navbar className='nav-bg' expand='md'  collapseOnSelect >
            <Container>
                <LinkContainer to='/'>
                <Navbar.Brand>
                <img src={logo} className='logo' alt='logo'/>
                <span className="link-text">Techno Shop</span>
                </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        <LinkContainer to='/cart' >
                        <Nav.Link className="link-text" ><span className="link-text"><FaShoppingCart /> Cart</span>
                        {items.length > 0 && (
                    <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                      {items.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                        </Nav.Link>

                        </LinkContainer>
                        {user ?(
                          <>
                  <NavDropdown style={{color:'blue'}} title={user.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
                        ) : (<LinkContainer to='/login' >
                        <Nav.Link className="link-text" ><span className="link-text"><FaUser /> Login</span></Nav.Link>
                        </LinkContainer>)}
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header