import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Navigationbar({user}) {

  const onLogout = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar className="main-nav" sticky="top" bg="dark" expand="lg" variant="dark">
		  <Container>
		    <Navbar.Brand className="navbar-logo" href="/">MyFlix</Navbar.Brand>
		  	  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
		  		  <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                {isAuth() && (<NavLink to={`/users/${user}`} className="nav-link">{user}</NavLink>)}
                {!isAuth() && (<Nav.Link href='/login'>Sign-in</Nav.Link>)}
                {!isAuth() && (<Nav.Link href='/register'>Sign-up</Nav.Link>)}
                {isAuth() && (<Nav.Link onClick={onLogout}>Logout</Nav.Link>)}
              </Nav>
            </Navbar.Collapse>
		  </Container>
	  </Navbar>
  );
};

export default Navigationbar;