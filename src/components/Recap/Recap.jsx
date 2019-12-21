import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Table, Container, Row, Col, Spinner } from "reactstrap";
import { GET_STUDENTS } from "../../gql";

function Recap() {
  const { loading, error, data } = useQuery(GET_STUDENTS);

  if (loading) return <Spinner />;
  if (error) return `Error! ${error.message}`;

  console.log(data);

  return (
    <Container>
      <Row>
        <Col>
          <Table dark>
            <thead>
              <tr>
                <th>Elèves</th>
                <th>Lundi</th>
                <th>Mardi</th>
                <th>Mercredi</th>
                <th>Jeudi</th>
                <th>Vendredi</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map(user => (
                <tr>
                  <th scope="row">
                    {user.firstName} {user.lastName}
                  </th>
                  <td>sign</td>
                  <td>sign</td>
                  <td>sign</td>
                  <td>sign</td>
                  <td>sign</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Recap;
