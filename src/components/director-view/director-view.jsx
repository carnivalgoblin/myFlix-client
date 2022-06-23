import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './director-view.scss';

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;

    return (
      <Fragment className="director-view">
        <Row>
          <Col sm={3} />
            <Col sm={6} className="director-name">
              <div className="label">Director:</div>
              <div className="value">{director.Director.Name}</div>
            </Col>
          <Col sm={3} />
        </Row>
        <Row>
          <Col sm={3} />
            <Col sm={6} className="director-bio">
              <div className="label">Bio:</div>
              <div className="value">{director.Director.Bio}</div>
            </Col>
          <Col sm={3} />
        </Row>
        <Row>
          <Col sm={3} />
            <Col sm={6} className="director-birth">
              <div className="label">Birth:</div>
              <div className="value">{director.Director.Birth}</div>
            </Col>
          <Col sm={3} />
        </Row>
        <Row>
          <Col sm={3} />
            <Col>
              <Button className="back-button" variant="info" onClick={() => { onBackClick(); }}>Back</Button>
            </Col>
          <Col sm={3} />
          
        </Row>
      </Fragment>
    )
  }
}

DirectorView.propTypes ={
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired
  }).isRequired
}
