import React from "react";
import { Row, Spinner } from "reactstrap";
import { useQuery } from "@apollo/react-hooks";

import { GET_USERS } from "../../gql";
import UserCard from "./UserCard";

function Users() {
  const { data, loading } = useQuery(GET_USERS);
  return (
    <Row>
      {loading ? (
        <Spinner />
      ) : (
        data &&
        data.users.map(user => {
          return <UserCard {...user} />;
        })
      )}
    </Row>
  );
}

export default Users;
