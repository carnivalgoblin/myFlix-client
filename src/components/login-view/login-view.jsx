import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

import './login-view.scss';

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
    const isReq = validate();
    // Send a request to the server for autghentication
    if(isReq) {
     axios.post('https://rpflixdb.herokuapp.com/login', {
        Username: username,
        Password: password
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
          console.log('No such user');
          alert('Unable to login. Please check your password and username.'); 
      });
    }
  };
  
  return (
    <Container className="login-view">
      <h3>Login</h3>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
          {usernameErr && <p className="alert-text">{usernameErr}</p>}
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
          {passwordErr && <p className="alert-text">{passwordErr}</p>}
        </Form.Group>

        <Button className="main-button" variant="info" type="submit" onClick={handleSubmit}>Submit</Button>
        <Link to={`/register`}>
          <Button variant="info" className="main-button">Not registered?</Button>
        </Link> 
      </Form>
    </Container>
  );
};

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
  };
