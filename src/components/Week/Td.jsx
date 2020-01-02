import React from "react";
import { today } from "../../utils";

function Td({ data: [key, value] }) {
  if (value) {
    const { uuid, signature } = value;
    return (
      <td key={uuid} className="bg-success">
        <img src={signature} alt="" width="50" />
      </td>
    );
  } else {
    // console.log(`Key ${key}`, `Today: ${today()}`);

    return (
      <td className={key < today() ? "bg-danger" : "bg-warning"}>
        {key < today() ? "Absent" : "Doit signer"}
      </td>
    );
  }
}

export default Td;
