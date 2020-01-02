import React from "react";
import { Col, Card, CardBody, CardImg, CardTitle, CardText } from "reactstrap";
import { today } from "../../utils";
const imgStyle = {
  alignSelf: "center",
  width: "50%",
  borderRadius: "50%"
};

function UserCard({ uuid, firstName, lastName, avatar, Signs }) {
  const hasSigned = Signs.some(el => el.date === today());
  return (
    <Col key={uuid} xs={12} sm={6} md={4} lg={3} className="mb-4">
      <Card outline color={hasSigned ? "success" : "danger"}>
        <CardImg src={avatar} alt={`${firstName} ${lastName}`} style={imgStyle} className="mt-3" />
        <CardBody>
          <CardTitle className="text-center">{`${firstName} ${lastName}`}</CardTitle>
          <CardText className={hasSigned ? "text-success" : "text-danger"} style={{ fontSize: 13 }}>
            {hasSigned ? "a signé !" : "n'a pas signé !"}
          </CardText>
        </CardBody>
      </Card>
    </Col>
  );
}

export default UserCard;
