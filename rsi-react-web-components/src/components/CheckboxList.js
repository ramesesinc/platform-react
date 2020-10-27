import React from "react";
import Panel from "./Panel";
import Checkbox from "./Checkbox";

const CheckboxList = ({
  visibleWhen = true,
  editable = true,
  readOnly = false,
  keyId,
  expr,
  list
}) => {
  if (!visibleWhen) return null;

  return (
    <Panel>
      {list.map(ot => {
        return <Checkbox key={ot[keyId]}
          caption={ot[keyTitle]}
          name={`${ot[keyId].toLowerCase()}`} />
      })}
    </Panel>
  );
};

export default CheckboxList;
