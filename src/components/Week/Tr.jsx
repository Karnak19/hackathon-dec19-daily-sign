import React, { useState } from "react";
import { Tooltip } from "reactstrap";

import Td from "./Td";

function Tr({ uuid, firstName, lastName, days, avatar }) {
  const [isTooltipOpen, setTooltipOpen] = useState(false);

  const toggle = target => {
    if (!isTooltipOpen[target]) {
      setTooltipOpen({
        ...isTooltipOpen,
        [target]: {
          isOpen: true
        }
      });
    } else {
      setTooltipOpen({
        ...isTooltipOpen,
        [target]: {
          isOpen: !isTooltipOpen[target].isOpen
        }
      });
    }
  };

  const isOpen = target => {
    return isTooltipOpen[target] ? isTooltipOpen[target].isOpen : false;
  };

  return (
    <>
      <tr key={uuid}>
        <td className="bg-info" id={`user-${uuid}`}>
          {firstName} {lastName}
        </td>

        {Object.entries(days).map(([key, value], i) => {
          return <Td key={i} data={[key, value]} />;
        })}
      </tr>
      <Tooltip
        placement="left"
        isOpen={isOpen(`user-${uuid}`)}
        toggle={() => toggle(`user-${uuid}`)}
        target={`user-${uuid}`}
      >
        <img src={avatar} alt={lastName} className="img-fluid" />
      </Tooltip>
    </>
  );
}

export default Tr;
