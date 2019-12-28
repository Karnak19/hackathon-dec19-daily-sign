import React, { useEffect } from "react";
import { Button, Row, Col, Card, CardTitle } from "reactstrap";
import { API_URL } from "../../env";
import queryString from "query-string";
import { useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logIn } from "../../store/actions";

function Login({ dispatch }) {
  const location = useLocation();
  const history = useHistory();
  const { token, id } = queryString.parse(location.search);

  useEffect(() => {
    if (token) {
      dispatch(logIn(token, id));
      setTimeout(() => {
        history.push("/sign");
      }, 200);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <Row style={{ height: "50vh" }} className="align-items-center">
      <Col sm={{ size: 6, offset: 3 }}>
        <Button block href={`${API_URL}/auth/google`} color="danger">
          Login with Google
        </Button>
      </Col>
    </Row>
  );
}

export default connect()(Login);
