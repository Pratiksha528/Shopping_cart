import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

function Header() {
  return (
    <>
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home"><i className="fa-brands fa-shopware"></i>&nbsp;ShopKart<i className="fa-solid fa-cart-shopping"></i></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing"><i class="fa-solid fa-cart-shopping"></i></Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <br />
   
  </>
  )
}


export default Header