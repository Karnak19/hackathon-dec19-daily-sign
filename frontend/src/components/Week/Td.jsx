import React from "react";
import { today } from "../../utils";

function Td({ data }) {
  const [key, value] = data;

  if (value.hasOwnProperty("morning") || value.hasOwnProperty("afternoon")) {
    return (
      <>
        {value.morning ? (
          <td className="bg-success">
            <img src={value.morning.signature} alt="" className="img-fluid" />
          </td>
        ) : (
          <td
            className={key < today() ? "bg-danger" : "bg-warning"}
            style={{ minWidth: "100px" }}
          ></td>
        )}
        {value.afternoon ? (
          <td className="bg-success">
            <img src={value.afternoon.signature} alt="" className="img-fluid" />
          </td>
        ) : (
          <td
            className={key < today() ? "bg-danger" : "bg-warning"}
            style={{ minWidth: "100px" }}
          ></td>
        )}
      </>
    );
  } else {
    return (
      <td colSpan={2} className={key < today() ? "bg-danger" : "bg-warning"}>
        {key < today() ? "Absent" : "Doit signer"}
      </td>
    );
  }
}

export default Td;
