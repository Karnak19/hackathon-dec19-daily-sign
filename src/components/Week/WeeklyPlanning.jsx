import React from "react";
import { Container, Row, Col, Table, Spinner } from "reactstrap";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

const FETCH_USER_WEEKLY = gql`
  query userWeekly($start: Int!, $end: Int!) {
    signsUsersWeekly(start: $start, end: $end) {
      uuid
      firstName
      lastName
      Signs {
        uuid
        date
        signature
      }
    }
  }
`;

function WeeklyPlanning() {
  const monday = Math.floor(
    moment()
      .startOf("week")
      .toDate()
      .getTime() / 1000
  );
  const sunday = Math.floor(
    moment()
      .endOf("week")
      .toDate()
      .getTime() / 1000
  );

  const { data, loading, error } = useQuery(FETCH_USER_WEEKLY, {
    variables: {
      start: monday,
      end: sunday
    }
  });

  if (loading) return <Spinner />;

  return (
    <Container>
      <Row>
        <Col>
          <Table>
            <tr>
              <td>Name</td>
              <td>Monday</td>
              <td>Tuesday</td>
              <td>Wednesday</td>
              <td>Thursday</td>
              <td>Friday</td>
            </tr>
            {data.signsUsersWeekly.map(user => {
              return (
                <tr>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  {user.Signs.map(sign => {
                    return (
                      <td>Il a signé ! {moment(new Date(sign.date * 1000)).format("dddd")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default WeeklyPlanning;
