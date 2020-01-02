import React, { useState } from "react";
import moment from "moment";

function Td({ key, value }) {
  const [today] = useState(moment().dayOfYear());

  if (value) {
    const { uuid, signature } = value;
    return (
      <td key={uuid} className="bg-success">
        <img src={signature} alt="" width="50" />
      </td>
    );
  } else {
    return (
      <td className={key < today ? "bg-danger" : "bg-warning"}>
        {key < today ? "Absent" : "Doit signer"}
      </td>
    );
  }
}

export default Td;
