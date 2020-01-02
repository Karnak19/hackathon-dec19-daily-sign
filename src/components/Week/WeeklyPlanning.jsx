import React, { useEffect, useState } from "react";
import { Row, Col, Spinner } from "reactstrap";
import { useLazyQuery } from "@apollo/react-hooks";
import moment from "moment";

import { monday, sunday, pad } from "../../utils";
import { FETCH_USER_WEEKLY } from "../../gql";
import UsersTable from "./UsersTable";

function WeeklyPlanning() {
  const [dates, setDates] = useState([]);
  const [users, setUsers] = useState([]); // We manipulate datas from GraphQL query and store them here
  const [getUsers, { data, loading }] = useLazyQuery(FETCH_USER_WEEKLY);

  useEffect(() => {
    const dateArray = [];
    for (let i = 1; i < 6; i++) {
      dateArray[i - 1] = {
        date: moment()
          .day(i)
          .toDate(),
        day: parseInt(
          `${moment()
            .day(i)
            .year()}${pad(
            moment()
              .day(i)
              .dayOfYear()
          )}`,
          10
        )
      };
    }
    console.log(dateArray);
    setDates(dateArray);
    // eslint-disable-next-line
  }, []);

  // TODO: Find why it doesn't works on every page changes except the first
  useEffect(() => {
    getUsers({
      variables: {
        start: monday,
        end: sunday
      }
    });
    if (data) {
      const finalUsers = data.signsUsersWeekly.map(user => {
        let finalObject = {
          ...user,
          days: {}
        };

        // Going through all days this week
        for (let i = 0; i < dates.length; i++) {
          // Going through all signs for an user
          for (let j = 0; j < user.Signs.length; j++) {
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
    // eslint-disable-next-line
  }, [data]);

  return (
    <Row>
      <Col xs={{ size: 12 }}>
        {loading && <Spinner />}
        {users && <UsersTable dates={dates} users={users} />}
      </Col>
    </Row>
  );
}

export default WeeklyPlanning;
