import React, { useState, useEffect, Fragment }  from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import './profile-view.scss';

import { MovieCard } from '../movie-card/movie-card';

export function ProfileView({movies, favorites}) {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  const [ usernameErr, setUsernameErr] = useState('');
  const [ passwordErr, setPasswordErr] = useState('');
  const [ emailErr, setEmailErr] = useState('');
  const [ favoriteMovies, setFavoriteMovie ] = useState('');

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

  // Update user info
  const updateUser = (e) => {
    e.preventDefault();
    const isReq = validate();
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    if (isReq) {
    axios.put(`https://rpflixdb.herokuapp.com/users/${user}`, 
    {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      }, 
      {
      headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        alert('Profile has been updated');
        localStorage.setItem('user', data.Username);
        window.open("/", "_self");
      })
      .catch(response => {
        console.error(response);
        alert('Unable to update');
      });
    }}

  // Deregister user
  const deregisterUser = () => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    axios.delete(`https://rpflixdb.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}`}
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.setState({
          user: null
        });
        alert("Your profile has been deleted!");        
        window.open("/", "_self");
      })
      .catch(response => {
        console.error(response);
        alert('Unable to unregister');
      });
  }

  // Call favorite movies
  const favoriteMoviesRender = () => {
    if (movies.length !== 0) {
      return (
        <Row className="justify-content-md-center">
          <Col>
            {favoriteMovies.length === 0 ? (<p>You have no favorite movies. Add some.</p>) : (favoriteMovies.map(movieId => (<MovieCard movieData={movies.find(m => m._id == movieId)} />)))}
          </Col>
        </Row>
      )
    }
  }

    return (
      <Fragment>
        <Container className="profile-view">
          <h3>Your profile</h3>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" placeholder={username} onChange={e => setUsername(e.target.value)} />
              {usernameErr && <p className="alert-text">{usernameErr}</p>}
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="****" onChange={e => setPassword(e.target.value)} />
              {passwordErr && <p className="alert-text">{passwordErr}</p>}
            </Form.Group>

            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" placeholder={email} value={email} onChange={e => setEmail(e.target.value)} />
              {emailErr && <p className="alert-text">{emailErr}</p>}
            </Form.Group>

            <Form.Group>
              <Form.Label>Birthday:</Form.Label>
              <Form.Control type="date" placeholder={birthday} value={birthday} onChange={e => setBirthday(e.target.value)} />
            </Form.Group>

            <Button className="main-button" variant="info" type="submit" onClick={updateUser}>Update</Button>
            <Button className="main-button" variant="danger" type="submit" onClick={deregisterUser}>Deregister</Button>
          </Form>
        </Container>
        <Container className="favorites-view">
          <h3>Your favorite movies</h3>
          <Col key={movies._id}>
          {favoriteMoviesRender()}
          </Col>
        </Container>
      </Fragment>
    )
  };