import React, { Fragment, useEffect } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import { setMovies, setUser, setFavorites } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view'; 
import Navigationbar from '../navbar/navbar';

class MainView extends React.Component {

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'));
      this.getMovies(accessToken);
      this.getFavorites();
    }
  }

  getMovies(token) {
    axios.get('https://rpflixdb.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      //Assign the result to the state
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getFavorites () {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    axios.get(`https://rpflixdb.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.props.setFavorites(response.data.Favorites)
    })
    .catch(e => {
      console.log("Error fetching favorites!")
    });
  }

  addFavorite = (movie) => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');    
    axios.patch(`https://rpflixdb.herokuapp.com/users/${user}/favorites/${movie._id}`, {},{
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      const data = response.data;
      this.getFavorites();
    })
    .catch(e => {
      console.log(e);
      console.log(`Could not add ${movie.Title} to favorites.`)
    });
  }

  removeFavorite = (movie) => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    axios.delete(`https://rpflixdb.herokuapp.com/users/${user}/favorites/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      const data = response.data;
      this.getFavorites();
    })
    .catch(e => {
      console.log(e);
      console.log(`Could not remove ${movie.Title} from favorites.`)
    });
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    const { setUser } = this.props;
    setUser(authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser('');
  }

  deregisterUser = (props) => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    axios.delete(`https://rpflixdb.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}`}
      })
      .then((response) => {
        const data = response.data;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.props.setUser('');
        alert("Your profile has been deleted!");        
        window.open("/", "_self");
      })
      .catch(response => {
        console.error(response);
        console.log('Unable to unregister');
      });
  }

  render() {
    let { movies, user, favorites } = this.props;
    
    return (
      <Router>
        <Navigationbar user={user} fixed="top" />
        <Container>
            <Row className="main-view justify-content-md-center">
              <Route exact path="/" render={() => {
                if (!user) return (
                   <> <Col sm={2} md={3} lg={4}></Col>
                      <Col sm={8} md={6} lg={4}>
                        <LoginView movies={movies} onLoggedIn={user => this.onLoggedIn(user)} />
                      </Col>
                      <Col sm={2} md={3} lg={4}></Col>
                    </>
                )

                if (movies.length === 0) return <div className="main-view" />;

                return <MoviesList movies={movies} />;
              }} />

              <Route path="/movies/:movieId" render={({ match, history }) => {
                if (!user) return <Redirect to="/" />
                if (movies.length === 0) return <div className="main-view" />;
                
                return <Col md={8}>
                  <MovieView favorites={favorites} removeFavorite={this.removeFavorite} addFavorite={this.addFavorite} movieData={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                </Col>
              }} />

              <Route path="/genres/:name" render={({ match, history }) => {
                if (!user) return <Redirect to="/" />
                if (movies.length === 0) return <div className="main-view" />;

                return <Col md={8}>
                  <GenreView genre={movies.find(m => m.Genre.Name === match.params.name)} onBackClick={() => history.goBack()} />
                </Col>
              }} />

              <Route path="/register" render={({ match, history }) => {
              if (user) return <Redirect to="/" />
              
                return (
                  <>
                    <Col sm={2} md={3} lg={3}> </Col>
                    <Col sm={8} md={6} lg={6}>
                      <RegistrationView />
                    </Col>
                    <Col sm={2} md={3} lg={3}> </Col>
                  </>
                )}} />

              <Route path="/login" render={({ match, history }) => {
              if (!user) return <Redirect to="/" />
              if (movies.length === 0) return <div className="main-view" />;
              
              return (
                <>
                  <Col sm={2} md={3} lg={4}></Col>
                  <Col sm={8} md={6} lg={4}>
                    <LoginView movies={movies} onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                  <Col sm={2} md={3} lg={4}></Col>
                </>
                )}} />

              <Route path="/directors/:name" render={({ match, history }) => {   
              if (!user) return <Redirect to="/" />
              if (movies.length === 0) return <div className="main-view" />;

              return <Col md={8}>
                  <DirectorView director={movies.find(m => m.Director.Name === match.params.name)} onBackClick={() => history.goBack()} />
                </Col>}} 
              />

              <Route path={`/users/${user}`} render={({ match, history }) => {                      
              if (!user) return <Redirect to="/" />
              if (movies.length === 0) return <div className="main-view" />;
              
              return <Col md={8}>
                  <ProfileView movies={movies} user={user} favorites={favorites} deregisterUser={this.deregisterUser} onBackClick={() => history.goBack()} />
                </Col>}} 
              />

              <Route path={`/user-update/${user}`} render={({ match, history }) => {                      
              if (!user) return <Redirect to="/" />
              if (movies.length === 0) return <div className="main-view" />;
              
              return <Col md={8}>
                  <UserUpdate user={user} onBackClick={() => history.goBack()} />
                </Col>}} 
              />
              
            </Row>
        </Container>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { 
    movies: state.movies,
    user: state.user,
    favorites: state.favorites
  }
}

export default connect(mapStateToProps, { setMovies, setUser, setFavorites })(MainView);