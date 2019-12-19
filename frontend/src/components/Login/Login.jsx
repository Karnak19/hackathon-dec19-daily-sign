import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card, CardTitle } from "reactstrap";
import { API_URL } from "../../env";
import queryString from "query-string";
import { useLocation, useHistory } from "react-router-dom";

function Login() {
  const [tooken, setTooken] = useState("");
  const location = useLocation();
  const { token } = queryString.parse(location.search);

  useEffect(() => {
    if (token) {
      setTooken(token);
    }
  }, []);
  console.log(token);
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

export default Login;
