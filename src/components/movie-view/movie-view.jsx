import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './movie-view.scss';
import axios from 'axios';

export class MovieView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      Favorites: []
    };
  }

  keypressCallback(event) {
    console.log(event.key);
  }
 
  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
    const token = localStorage.getItem('token');
    this.getUser(token);
  }
  
  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

 
  // Get user favorites
  getUser (token) {
    /* let token = localStorage.getItem('token'); */
    let user = localStorage.getItem('user');
    axios.get(`https://rpflixdb.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      const data = response.data;
      console.log("User data has been loaded.");
      this.setState({
        username: data.Username,
        Favorites: data.Favorites
      });      
    })
    .catch(e => {
      console.log("Error! Unable to fetch user info.")
    });
  }

  // Add function to add favorite movie
  addFavorite = () => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    let userFavorites =  this.state.Favorites;
    let isFavorite = userFavorites.includes(this.props.movieData._id);
    if (!isFavorite) {
      axios.patch(`https://rpflixdb.herokuapp.com/users/${user}/favorites/${this.props.movieData._id}`, {},{
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      this.setState({
        Favorites: data.Favorites
      })
      alert(`${this.props.movieData.Title} has been added to your list of favorite movies.`)
    })
    .catch(e => {
      console.log(e);
    });
    } else if (isFavorite) {
      alert(`${this.props.movieData.Title} is already present in your list of favorite movies.`);
    }
  }

  removeFavorite = () => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    axios.delete(`https://rpflixdb.herokuapp.com/users/${user}/favorites/${this.props.movieData._id}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      alert(`${this.props.movieData.Title} has been removed from your list of favorites.`);
      this.setState({
        Favorites: data.Favorites
      })
    })
    .catch(e => {
      console.log(e)
    });
  }

  render() {
    const { movieData, onBackClick } = this.props;
    const { Favorites, username } = this.state;
    let userFavorites =  this.state.Favorites;
    let isFavorite = userFavorites.includes(this.props.movieData._id);

    return (
    <Fragment>
      <Row className="title-row">
        <div className="movie-title">
          <span className="value">{movieData.Title}</span>
        </div>
      </Row>
      <Row className="movie-row">
        <Col sm={6}>
        <div className="movie-description">
          <span className="label">Description: <br/></span>
          <span className="value">{movieData.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: <br/></span>
          <Link to={`/genres/${movieData.Genre.Name}`}>
            <Button variant="link">{movieData.Genre.Name}</Button>
          </Link>
        </div>
        <div className="movie-director">
          <span className="label">Director: <br/></span>
          <Link to={`/directors/${movieData.Director.Name}`}>
            <Button variant="link">{movieData.Director.Name}</Button>
          </Link>
        </div>
        </Col>
        <Col className="movie-poster" sm={6}>
          <img className="poster" src={movieData.ImagePath} />
        </Col>
      </Row>
      <Row>
        {!isFavorite && (
        <Col>
          <Button className="main-button add-favorite-button" variant="warning" onClick={this.addFavorite}>Add to favorites</Button>
        </Col>
        )}
        {isFavorite && (
        <Col>
          <Button className="main-button remove-favorite-button" variant="warning" onClick={this.removeFavorite}>Remove from favorites</Button>
        </Col>
        )}
      </Row>
      <Row>
        <Col>
          <Button className="main-button back-button" variant="info" onClick={() => { onBackClick(); }}>Back</Button>
        </Col>
      </Row>
    </Fragment>
    );
  }
}

MovieView.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    Actors: PropTypes.array,
    Featured: PropTypes.bool,
    _id: PropTypes.string.isRequired
  }).isRequired,
  onBackClick:PropTypes.func.isRequired
};