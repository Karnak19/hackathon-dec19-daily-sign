import React from "react";
import { Table } from "reactstrap";
import moment from "moment";

import Tr from "./Tr";
import styles from "./table.module.scss";

function UsersTable({ dates, users }) {
  return (
    <Table striped hover bordered size="sm" className={styles.table}>
      <thead>
        <tr>
          <td rowSpan={2}>Name</td>
          {dates.map(({ date, day }) => {
            return (
              <td colSpan={2} key={day}>
                {moment(date).format("dddd Do MMMM")}
              </td>
            );
          })}
        </tr>
        <tr>
          {/* <td></td> */}
          {dates.map(() => {
            return (
              <>
                <td>Morning</td>
                <td>Afternoom</td>
              </>
            );
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
