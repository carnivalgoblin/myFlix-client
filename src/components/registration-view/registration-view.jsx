import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

import './registration-view.scss';

export function RegistrationView() {
  // initiate variables for input
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  const [ usernameErr, setUsernameErr] = useState('');
  const [ passwordErr, setPasswordErr] = useState('');
  const [ emailErr, setEmailErr ] = useState('');

  // Function to validate input
  const validate = () => {
    let isReq = true;
    if(!username){
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters long');
      isReq = false;
    }
    if(!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters long');
      isReq = false;
    }
    if(!email) {
      setEmailErr('Email required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Must be a valid email adress');
      isReq = false;
    }

    return isReq;
  }

  // Function to handle registration submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      axios.post('https://rpflixdb.herokuapp.com/users/register', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        alert('Registration successful. Please login!');
        window.open('/', '_self');
      })
      .catch(response => {
        console.error(response);
        alert('Unable to register');
      });
    }
  };

  return (
    <Container className="registration-view">
      <h3>Please register</h3>
      <Form>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" placeholder="Choose Username" value={username} onChange={e => setUsername(e.target.value)} required />
          {usernameErr && <p className="alert-text">{usernameErr}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Choose Password" value={password} onChange={e => setPassword(e.target.value)} required />
          {passwordErr && <p className="alert-text">{passwordErr}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} required />
          {emailErr && <p className="alert-text">{emailErr}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Birthday:</Form.Label>
          <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
        </Form.Group>
        <Button variant="info" className="main-button" type="submit" onClick={handleSubmit}>Register</Button>
        <Link to={`/login`}>
          <Button variant="info" className="main-button">Already registered?</Button>
        </Link>      
      </Form>
    </Container>
  );
}