import React, { useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';

export function Navbar(props) {

  const onLogout = (e) => {
    e.preventDefault();
    props.onLoggedOut();
  };

  return (
    <Navbar className="main-nav" sticky="top" bg="dark" expand="lg" variant="dark">
		  <Container>
		    <Navbar.Brand href="/">MyFlix</Navbar.Brand>
		  	  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
		  		  <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="#home" key='home'>Home</Nav.Link>
                <Nav.Link href="#profile" key='profile'>Profile</Nav.Link>
                <Nav.Link href="#logout" key='logout' onClick={onLogout}>Logout</Nav.Link>
              </Nav>
          </Navbar.Collapse>
		  </Container>
	  </Navbar>
  );
};

Navbar.propTypes = {
    onLogout: PropTypes.func
  };
