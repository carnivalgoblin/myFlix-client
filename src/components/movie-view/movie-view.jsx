import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './movie-view.scss';

export class MovieView extends React.Component {

  constructor(props) {
    super(props);
  }

  keypressCallback(event) {
    console.log(event.key);
  }
 
  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
    const token = localStorage.getItem('token');
  }
  
  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movieData, onBackClick, favorites, removeFavorite, addFavorite } = this.props;
    let isFavorite = favorites.includes(this.props.movieData._id);

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
          <Button className="main-button add-favorite-button" variant="warning" onClick={() => (addFavorite(this.props.movieData))}>Add to favorites</Button>
        </Col>
        )}
        {isFavorite && (
        <Col>
          <Button className="main-button remove-favorite-button" variant="warning" onClick={() => (removeFavorite(this.props.movieData))}>Remove from favorites</Button>
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