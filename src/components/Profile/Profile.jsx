import React from "react";
import { Container, Row, Col, Card } from "reactstrap";
import { connect } from "react-redux";

function Profile({ id }) {
  return (
    <Container>
      <Row>
        <Col xs={{ size: 8, offset: 2 }}>
          <Card></Card>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    id: state.userId
  };
};

export default connect(mapStateToProps)(Profile);
