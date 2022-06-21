import React, { Fragment } from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Navbar } from '../navbar/navbar';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
      registered: true
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://rpflixdb.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      //Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  onRegister(registered) {
    this.setState({
      registered
    });
  }

  render() {
    const { movies, user, registered } = this.state;

    if (!registered) return <RegistrationView onRegister={registered => this.onRegister(registered)} />;

    if (!user) return (
        <Row>
          <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegister={registered => this.onRegister(registered)} />
          </Col>
        </Row>
      );

    if (movies.length === 0) return <div className="main-view" />

    return (
      <Router>
        <Navbar fixed="top" onLoggedOut={() => this.onLoggedOut()} />
        <Container>
            <Row className="main-view justify-content-md-center">
              <Route exact path="/" render={() => {
                return movies.map(m => (
                  <Col md={3} key={m._id}>
                    <MovieCard movieData={m} />
                  </Col>
                ))
              }} />
              <Route path="/movies/:movieId" render={({ match, history }) => {
                return <Col md={8}>
                  <MovieView movieData={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                </Col>
              }} />
            </Row>
        </Container>
      </Router>
    );
  }
}