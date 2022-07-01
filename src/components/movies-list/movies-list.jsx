import React from "react";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";

import { MovieCard } from "../movie-card/movie-card";

import './movies-list.scss';
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies= movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />

  return <>
  <Col md={12} style={{ marginTop: '1em' }}>
  <VisibilityFilterInput visibilityFilter={visibilityFilter} />
  </Col>
  {filteredMovies.map(m => (
    <Col sm={12} md={6} lg={4} key={m._id}>
      <MovieCard movieData={m} />
    </Col>
  ))}
  </>;
}

export default connect(mapStateToProps)(MoviesList);