import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import './login-view.scss';
import axios from 'axios';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ usernameErr, setUsernameErr] = useState('');
  const [ passwordErr, setPasswordErr] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username){
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters long');
      isReq = false;
    }
    if (!password){
      setPasswordErr('Password required');
      isReq = false;
    } else if (password.length < 6){
      setPasswordErr('Password must be 6 characters long');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for autghentication
    axios.post('https://rpflixdb.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('No such user') 
    })
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
        {usernameErr && <p>{usernameErr}</p>}
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
        {passwordErr && <p>{passwordErr}</p>}
      </Form.Group>

      <Button className="main-button" variant="info" type="submit" onClick={handleSubmit}>Submit</Button>
      <Button className="main-button" variant="info" type="submit" onClick={handleNotRegistered}>Not registered?</Button>
    </Form>
    </Container>
  );
};


LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired
  };
