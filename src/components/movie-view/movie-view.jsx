import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
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
      <div className="movie-view">
        <div className="movie-poster">
          <img className="poster" src={movieData.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movieData.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movieData.Description}</span>
        </div>
        <Button variant="info" onClick={() => { onBackClick(null); }}>Back</Button>
      </div>
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