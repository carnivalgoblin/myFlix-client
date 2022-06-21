import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for autghentication
    // then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

  const handleNotRegistered = (e) => {
    e.preventDefault();
    props.onRegister(false);
  };
  
  return (
    <Container>
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlID="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" opnChange={e => setPassword(e.target.value)} />
      </Form.Group>

      <Button className="main-button" variant="info" type="submit" onClick={handleSubmit}>Submit</Button>
    </Form>
    </Container>
  );
};


LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired
  };
