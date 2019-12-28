import React, { useEffect, useState } from "react";
import { Row, Col, Table, Spinner, Button } from "reactstrap";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

import { monday, sunday, retrieveDate } from "../../utils";
import { FETCH_USER_WEEKLY } from "../../gql";

function WeeklyPlanning() {
  const [dates, setDates] = useState([]);
  const [users, setUsers] = useState([]);
  const { data, loading, refetch } = useQuery(FETCH_USER_WEEKLY, {
    variables: {
      start: monday,
      end: sunday
    }
  });

  useEffect(() => {
    const x = [];
    for (let i = 1; i < 8; i++) {
      x[i - 1] = {
        date: moment()
          .day(i)
          .toDate(),
        day: moment()
          .day(i)
          .dayOfYear()
      };
    }
    setDates(x);
  }, []);

  useEffect(() => {
    if (data) {
      const finalUsers = data.signsUsersWeekly.map(user => {
        let finalObject = {
          ...user,
          days: {}
        };

        for (let i = 0; i < dates.length; i++) {
          // Going through all days this week
          for (let j = 0; j < user.Signs.length; j++) {
            // Going through all signs for an user
            if (user.Signs[j].date === dates[i].day) {
              finalObject.days[dates[i].day] = user.Signs[j]; // If it match, we add a new key with the sign object
            } else {
              // If it don't match, we check if the key already exist, if not, we create it with with a null value
              if (!finalObject.days.hasOwnProperty(dates[i].day)) {
                finalObject.days[dates[i].day] = null;
              }
            }
          }
        }
        return finalObject;
      });

      setUsers(finalUsers);
    }
  }, [data]);

  return (
    <Row>
      <Col xs={{ size: 12 }}>
        <Button onClick={() => refetch()}>Refetch</Button>
      </Col>
      <Col xs={{ size: 12 }}>
        {loading && <Spinner />}
        {users && (
          <Table striped hover>
            <thead>
              <tr>
                <td>Name</td>
                {dates.map(({ date, day }) => {
                  return (
                    // <td key={day}>{moment(date).format("dddd Do MMMM")}</td>
                    <td key={day}>{day}</td>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {users.map(user => {
                return (
                  <tr key={user.uuid}>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    {Object.entries(user.days).map(([key, value]) => {
                      if (value) {
                        const { uuid, date, signature } = value;
                        return (
                          <td key={uuid} className="bg-success">
                            <img src={signature} alt="" width="50" />
                          </td>
                        );
                      } else {
                        return <td className="bg-warning">absent</td>;
                      }
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
