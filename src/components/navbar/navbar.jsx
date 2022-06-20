import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import Container from 'react-bootstrap/Container';

export function Navbar() {

  return (
    <Navbar className="main-nav" sticky="top" bg="dark" expand="lg" variant="dark">
		  <Container>
		    <Navbar.Brand href="/">MyFlix</Navbar.Brand>
		  	  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
		  		  <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#profile">Profile</Nav.Link>
                <Nav.Link href="#logout">Logout</Nav.Link>
              </Nav>
          </Navbar.Collapse>
		  </Container>
	  </Navbar>
  );
};
