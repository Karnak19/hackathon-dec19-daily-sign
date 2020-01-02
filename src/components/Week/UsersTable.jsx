import React from "react";
import { Table } from "reactstrap";
import moment from "moment";

import Tr from "./Tr";

function UsersTable({ dates, users }) {
  return (
    <Table striped hover bordered size="sm">
      <thead>
        <tr>
          <td>Name</td>
          {dates.map(({ date, day }) => {
            return <td key={day}>{moment(date).format("dddd Do MMMM")}</td>;
          })}
        </tr>
      </thead>
      <tbody>
        {users.map(user => {
          return <Tr {...user} />;
        })}
      </tbody>
    </Table>
  );
}

export default UsersTable;
