import React from "react";
import { Container, Row, Col, Card, Spinner } from "reactstrap";
import { connect } from "react-redux";
import { GET_USER } from "../../gql";
import { useQuery } from "@apollo/react-hooks";

function Profile({ id }) {
  const { data, loading } = useQuery(GET_USER, {
    variables: { id }
  });

  return (
    <Container>
      <Row>
        <Col xs={{ size: 8, offset: 2 }}>
          {loading ? (
            <Spinner />
          ) : (
            data && (
              <Card>
                <img src={data.user.avatar} alt="" />
                <h1>
                  {data.user.firstName} {data.user.lastName}
                </h1>
                <h2>{data.user.email}</h2>
              </Card>
            )
          )}
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
