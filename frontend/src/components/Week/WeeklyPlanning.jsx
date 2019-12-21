import React from "react";
import { Row, Col, Table, Spinner, Button } from "reactstrap";
import { useQuery } from "@apollo/react-hooks";
import { monday, sunday } from "../../utils";
import { FETCH_USER_WEEKLY } from "../../gql";

function WeeklyPlanning() {
  const { data, loading, refetch } = useQuery(FETCH_USER_WEEKLY, {
    variables: {
      start: monday,
      end: sunday
    }
  });

  return (
    <Row>
      <Col xs={{ size: 2 }}>
        <Button onClick={() => refetch()}>Refetch</Button>
      </Col>
      <Col xs={{ size: 10 }}>
        {loading && <Spinner />}
        {data && (
          <Table striped hover>
            <thead>
              <tr>
                <td>Name</td>
                <td>Monday</td>
                <td>Tuesday</td>
                <td>Wednesday</td>
                <td>Thursday</td>
                <td>Friday</td>
              </tr>
            </thead>
            <tbody>
              {data.signsUsersWeekly.map(user => {
                return (
                  <tr key={user.uuid}>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    {user.Signs.sort((a, b) => a.date - b.date).map(sign => {
                      return (
                        // <td>Il a signé ! {moment(new Date(sign.date * 1000)).format("dddd")}</td>
                        <td key={sign.uuid}>
                          <img src={sign.signature} alt="" width="50" />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default WeeklyPlanning;
