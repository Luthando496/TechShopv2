import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'

const Footer = () => {

    const currentYear = new Date().getFullYear();
  return (
    <footer>
    <Container>
        <Row>
            <Col className='text-center py-4 bg-secondary'>
                <p className='text-primary text-xl'>Copyright &copy; {currentYear}</p>
            </Col>
        </Row>
    </Container>

    </footer>
  )
}

export default Footer