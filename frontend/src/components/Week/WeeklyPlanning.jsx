import React, { useEffect, useState } from "react";
import { Row, Col, Table, Spinner, Button } from "reactstrap";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

import { monday, sunday } from "../../utils";
import { FETCH_USER_WEEKLY } from "../../gql";

function WeeklyPlanning() {
  const [dates, setDates] = useState([]);
  const [users, setUsers] = useState([]);
  const [today] = useState(moment().dayOfYear());
  const { data, loading, refetch } = useQuery(FETCH_USER_WEEKLY, {
    variables: {
      start: monday,
      end: sunday
    }
  });

  useEffect(() => {
    const x = [];
    for (let i = 1; i < 6; i++) {
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

  // TODO: Find why it doesn't works on every page changes except the first
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
      <Col xs={{ size: 12 }} className="mb-5">
        <Button block onClick={() => refetch()} color="info">
          Refetch
        </Button>
      </Col>
      <Col xs={{ size: 12 }}>
        {loading && <Spinner />}
        {users && (
          <Table striped hover bordered size="sm">
            <thead>
              <tr>
                <td>Name</td>
                {dates.map(({ date, day }) => {
                  return (
                    <td key={day}>{moment(date).format("dddd Do MMMM")}</td>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {users.map(user => {
                return (
                  <tr key={user.uuid}>
                    <td className="bg-info">
                      {user.firstName} {user.lastName}
                    </td>

                    {Object.entries(user.days).map(([key, value]) => {
                      if (value) {
                        const { uuid, signature } = value;
                        return (
                          <td key={uuid} className="bg-success">
                            <img src={signature} alt="" width="50" />
                          </td>
                        );
                      } else {
                        return (
                          <td
                            className={key < today ? "bg-danger" : "bg-warning"}
                          >
                            {key < today ? "Absent" : "Doit signer"}
                          </td>
                        );
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
