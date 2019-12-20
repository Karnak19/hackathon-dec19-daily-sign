import React, { useState, useRef } from "react";
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import axios from "axios";
import { connect } from "react-redux";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { convertBase64StringToFile } from "../../utils";

import styleCanvas from "./sigCanvas.module.scss";
import { Container, Row, Col, Button, Spinner } from "reactstrap";

const ADD_TODO = gql`
  mutation createSign($userId: String!, $signature: String!) {
    createSign(userId: $userId, signature: $signature) {
      uuid
      signature
      User {
        email
      }
    }
  }
`;

function Sign({ userId }) {
  const [signUrl, setSignUrl] = useState("");
  const [addTodo, { data, loading, error }] = useMutation(ADD_TODO);
  const sigCanvas = useRef({});
  const clear = () => sigCanvas.current.clear();

  const save = async () => {
    const formData = new FormData();
    const signImage = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");

    formData.set("image", convertBase64StringToFile(signImage));
    formData.set("type", "file");

    try {
      const res = await axios.post("https://api.imgur.com/3/image", formData, {
        headers: {
          Authorization: "Client-ID 859d204377034e9"
        }
      });

      setSignUrl(res.data.data.link);
      addTodo({ variables: { userId: userId, signature: signUrl } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        {loading && <Spinner />}

        <Col xs={{ size: 6, offset: 3 }}>
          <h1>Sign</h1>
          <Popup
            modal
            trigger={<Button>Open Signature Pad</Button>}
            closeOnDocumentClick={false}
          >
            {close => (
              <>
                <SignaturePad
                  ref={sigCanvas}
                  canvasProps={{
                    className: styleCanvas.signatureCanvas
                  }}
                />
                <Button onClick={save}>save</Button>
                <Button onClick={clear}>clear</Button>
                <Button onClick={close}>close</Button>
              </>
            )}
          </Popup>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.userId
  };
};

export default connect(mapStateToProps)(Sign);