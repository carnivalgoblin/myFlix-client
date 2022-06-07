import React from 'react';
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
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}