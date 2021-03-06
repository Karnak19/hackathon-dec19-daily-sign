import React, { useRef, useState } from "react";
import SignaturePad from "react-signature-canvas";
import axios from "axios";
import { connect } from "react-redux";
import { useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import { Row, Col, Button, Spinner, Modal, ModalBody, ModalFooter } from "reactstrap";

import { convertBase64StringToFile } from "../../utils";
import { SIGN_USER } from "../../gql";
import styleCanvas from "./sigCanvas.module.scss";

function Sign({ userId }) {
  const [addTodo] = useMutation(SIGN_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const sigCanvas = useRef({});

  const toggle = () => setIsOpen(!isOpen);
  const clear = () => sigCanvas.current.clear();
  const save = async cb => {
    setIsLoading(true);
    const formData = new FormData();
    const signImage = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");

    formData.set("image", convertBase64StringToFile(signImage));
    formData.set("type", "file");

    try {
      const res = await axios.post("https://api.imgur.com/3/image", formData, {
        headers: {
          Authorization: "Client-ID 859d204377034e9"
        }
      });

      await addTodo({
        variables: { userId: userId, signature: res.data.data.link }
      });

      cb();

      toast.success("You sign successfully !", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row>
      <Col xs={{ size: 6, offset: 3 }}>
        <h1>Sign</h1>
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalBody>
            <SignaturePad
              ref={sigCanvas}
              canvasProps={{
                className: styleCanvas.signatureCanvas
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={clear}>
              Clear
            </Button>
            <Button color="success" disabled={isLoading} onClick={() => save(toggle)}>
              {isLoading && <Spinner size="sm" className="mr-2" />}
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </Col>
    </Row>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.userId
  };
};

export default connect(mapStateToProps)(Sign);
