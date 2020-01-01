import React from "react";
import { Row, Col, Card, Spinner, CardImg } from "reactstrap";
import { connect } from "react-redux";
import { GET_USER } from "../../gql";
import { useQuery } from "@apollo/react-hooks";

function Profile({ id }) {
  const { data, loading } = useQuery(GET_USER, {
    variables: { id }
  });

  return (
    <Row>
      <Col xs={{ size: 6, offset: 3 }}>
        {loading ? (
          <Spinner />
        ) : (
          data && (
            <Card>
              <CardImg src={data.user.avatar} alt="" />
              <h1>
                {data.user.firstName} {data.user.lastName}
              </h1>
              <h2>{data.user.email}</h2>
            </Card>
          )
        )}
      </Col>
    </Row>
  );
}

const mapStateToProps = state => {
  return {
    id: state.userId
  };
};

export default connect(mapStateToProps)(Profile);
