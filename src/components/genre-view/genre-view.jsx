import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import './genre-view.scss';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Fragment className="genre-view">
        <Row>
          <Col sm={3} />
            <Col sm={6} className="genre-title">
              <div className="label">Genre:</div>
              <div className="value">{genre.Genre.Name}</div>
            </Col>
          <Col sm={3} />
        </Row>
        <Row>
          <Col sm={3} />
            <Col sm={6} className="genre-description">
              <div className="label">Description:</div>
              <div className="value">{genre.Genre.Description}</div>
            </Col>
          <Col sm={3} />
        </Row>
        <Row>
          <Col sm={3} />
            <Col sm={6}>
              <Button className="back-button" variant="info" onClick={() => { onBackClick(); }}>Back</Button>
            </Col>
          <Col sm={3} />
        </Row>
      </Fragment>
    )
  }
}

GenreView.propTypes ={
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Descriptionn: PropTypes.string.isRequired
  }).isRequired
}
