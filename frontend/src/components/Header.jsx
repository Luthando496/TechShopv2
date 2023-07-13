import {Navbar,Nav,Container} from "react-bootstrap"
import {FaShoppingCart,FaUser} from "react-icons/fa"
import logo from '../assets/techno.png'
import {LinkContainer} from 'react-router-bootstrap'


const Header = () => {
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
                        </Nav.Link>

                        </LinkContainer>
                        <LinkContainer to='/login' >
                        <Nav.Link className="link-text" ><span className="link-text"><FaUser /> Login</span></Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header