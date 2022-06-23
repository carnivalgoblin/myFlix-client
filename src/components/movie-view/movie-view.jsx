import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import './movie-view.scss';

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }
 
  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }
  
  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movieData, onBackClick } = this.props;

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
          <span className="value">{movieData.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: <br/></span>
          <span className="value">{movieData.Director.Name}</span>
        </div>
        </Col>
        <Col className="movie-poster" sm={6}>
          <img className="poster" src={movieData.ImagePath} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button className="back-button" variant="info" onClick={() => { onBackClick(null); }}>Back</Button>
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