import React, { useEffect } from "react";
import { Button, Container, Row, Col, Card, CardTitle } from "reactstrap";
import { API_URL } from "../../env";
import queryString from "query-string";
import { useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import { LOGIN } from "../../reducers/reducer";

function Login({ dispatch }) {
  const location = useLocation();
  const history = useHistory();
  const { token, id } = queryString.parse(location.search);

  useEffect(() => {
    if (token) {
      dispatch({ type: LOGIN, payload: { token, id } });
      toast.success("You sign successfully !", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      history.push("/");
    }
  }, []);

  return (
    <Container className="mt-3">
      <Row>
        <Col sm={{ size: 6, offset: 3 }}>
          <Card body outline>
            <CardTitle>
              <h1>LOGIN</h1>
            </CardTitle>
            <Button block href={`${API_URL}/auth/google`} color="danger">
              Google
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default connect()(Login);
