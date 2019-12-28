import React from "react";
import { Row, Col, Button } from "reactstrap";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { routes } from "../../Router";

function Home({ isAuth }) {
  if (!isAuth) return <Redirect to="/login" />;
  return (
    <Row style={{ height: "50vh" }} className="align-items-center">
      <Col xs={{ size: 8, offset: 2 }}>
        {routes.map(route => {
          return (
            <Button color="info" block tag={Link} to={route.url}>
              {route.label}
            </Button>
          );
        })}
      </Col>
    </Row>
  );
}

const mapStateToProps = state => {
  return { isAuth: state.isAuth };
};

export default connect(mapStateToProps)(Home);
