import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import './registration-view.scss';

export function RegistrationView(props) {
  // initiate variables for input
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  // Function to handle registration submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegister(true);
  };

  const handleAlreadyRegistered = (e) => {
    e.preventDefault();
    props.onRegister(true);
  };

  return (
    <Container>
    <Form>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
       <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
       <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>
       <Form.Group>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>
      <Button variant="info" className="main-button" type="submit" onClick={handleSubmit}>Register</Button>
      <Button variant="info" type="submit" onClick={handleAlreadyRegistered}>Already registered? Click here</Button>
    </Form>
    </Container>
  );
}

RegistrationView.propTypes = {
  onRegister: PropTypes.func.isRequired
};