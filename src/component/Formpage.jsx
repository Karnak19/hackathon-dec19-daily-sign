import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./Formpage.css";

const FETCH_USERS = gql`
  {
    users {
      uuid
      email
    }
  }
`;

function FormRegister() {
  const { loading, error, data } = useQuery(FETCH_USERS);
  return (
    <div>
      <Form>
        <FormGroup>
          <Label for="/">Avatar:</Label>
          <Input type="text" name="avatar" placeholder="avatar placeholder" />
        </FormGroup>
        <FormGroup>
          <Label for="fisrtname">Nom:</Label>
          <Input
            type="text"
            name="firstname"
            placeholder="firstname placeholder"
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastname">Prénom:</Label>
          <Input
            type="text"
            name="lastname"
            placeholder="lastname placeholder"
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </div>
  );
}

export default FormRegister;
