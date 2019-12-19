import React, { useState, useRef } from "react";
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import axios from "axios";
import styleCanvas from "./sigCanvas.module.scss";

function Sign() {
  const [imageURL, setImageURL] = useState(null);
  const sigCanvas = useRef({});
  const clear = () => sigCanvas.current.clear();

  const save = () => {
    const formData = new FormData();
    const signImage = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
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
    <div>
      <h1>Sign</h1>
      <Popup
        modal
        trigger={<button>Open Signature Pad</button>}
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
            <button onClick={save}>save</button>
            <button onClick={clear}>clear</button>
            <button onClick={close}>close</button>
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
    </div>
  );
}

export default Sign;
