import React from "react";

import Td from "./Td";

function Tr({ uuid, firstName, lastName, days }) {
  return (
    <tr key={uuid}>
      <td className="bg-info">
        {firstName} {lastName}
      </td>

      {Object.entries(days).map(([key, value], i) => {
        return <Td key={i} data={[key, value]} />;
      })}
    </tr>
  );
}

export default Tr;
