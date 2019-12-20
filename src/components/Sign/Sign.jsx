import React, { useState, useRef } from "react";
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import axios from "axios";
import styleCanvas from "./sigCanvas.module.scss";
import { Container, Row, Col, Button } from "reactstrap";

function Sign() {
  const [imageURL, setImageURL] = useState(null);
  const sigCanvas = useRef({});
  const clear = () => sigCanvas.current.clear();

  const save = () => {
    const formData = new FormData();
    const signImage = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    setImageURL(signImage);
    console.log(signImage);

    formData.append("image", signImage);
    formData.append("type", "base64");

    axios
      .post("https://api.imgur.com/3/image", formData, {
        headers: {
          Authorization: "Client-ID 859d204377034e9"
        }
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  return (
    <Container>
      <Row>
        <Col xs={{ size: 6, offset: 3 }}>
          <h1>Sign</h1>
          <Popup modal trigger={<Button>Open Signature Pad</Button>} closeOnDocumentClick={false}>
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
          {imageURL ? (
            <img
              src={imageURL}
              alt="signature"
              style={{
                display: "block",
                width: "150px"
              }}
            />
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}

export default Sign;
