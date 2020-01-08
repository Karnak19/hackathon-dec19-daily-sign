import React, { useEffect, useState } from "react";
import { Row, Col, Spinner, Button } from "reactstrap";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

import { monday, sunday, pad } from "../../utils";
import { FETCH_USER_WEEKLY } from "../../gql";
import UsersTable from "./UsersTable";
import useWeek from "../../hooks/useWeeks";

function WeeklyPlanning() {
  const [users, setUsers] = useState([]); // We manipulate datas from GraphQL query and store them here
  const { week, decrementWeek, incrementWeek, startOfWeek, endOfWeek } = useWeek();
  const { loading, error, data, refetch } = useQuery(FETCH_USER_WEEKLY, {
    variables: {
      start: startOfWeek ? startOfWeek : monday,
      end: endOfWeek ? endOfWeek : sunday
    }
  });

  useEffect(() => {
    const fetch = async () => {
      const { data } = await refetch();

      if (data) {
        const finalUsers = data.signsUsersWeekly.map(user => {
          let finalObject = {
            ...user,
            days: {}
          };

          // Going through all days this week
          for (let i = 0; i < week.length; i++) {
            // Going through all signs for an user
            for (let j = 0; j < user.Signs.length; j++) {
              if (user.Signs[j].date === week[i].day) {
                if (!finalObject.days.hasOwnProperty(week[i].day)) {
                  finalObject.days[week[i].day] = {};
                }
                if (user.Signs[j].morningOrAfternoon === "morning") {
                  finalObject.days[week[i].day].morning = user.Signs[j]; // Check if the user has signed morning or afternoon
                }
                if (user.Signs[j].morningOrAfternoon === "afternoon") {
                  finalObject.days[week[i].day].afternoon = user.Signs[j]; // Check if the user has signed morning or afternoon
                }
              } else {
                // If it don't match, we check if the key already exist, if not, we create it with with a null value
                if (!finalObject.days.hasOwnProperty(week[i].day)) {
                  finalObject.days[week[i].day] = {};
                }
              }
            }
          }
          return finalObject;
        });

        setUsers(finalUsers);
      }
    };
    fetch();
    // eslint-disable-next-line
  }, [week]);

  if (loading) return <Spinner />;
  if (error) return <>Error !</>;

  return (
    <>
      <Row className="mb-5">
        <Col xs={{ offset: 1, size: 4 }}>
          <Button block color="info" onClick={decrementWeek}>
            Back
          </Button>
        </Col>
        <Col xs={{ offset: 2, size: 4 }}>
          <Button block color="info" onClick={incrementWeek}>
            Next
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={{ size: 12 }}>{users && <UsersTable dates={week} users={users} />}</Col>
      </Row>
    </>
  );
}

export default WeeklyPlanning;
