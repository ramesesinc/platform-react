import React from "react";
import { Checkbox, isVisible } from "rsi-react-web-components";
import LocalAddress from "./LocalAddress";
import NonLocalAddress from "./NonLocalAddress";

const toBoolean = (val) => {
  if (typeof val === "boolean") {
    return val;
  } else if (typeof val === "number") {
    return val === 1;
  }
  return true;
}

const ResidenceAddress = ({person, orgcode, name, editable = true, visibleWhen = true, ...rest }) => {
  if (!visibleWhen) return null;
  const resident = toBoolean(person.resident);

  return (
    <React.Fragment>
      <Checkbox caption="Resident?" name={`${name}.resident`} editable={editable}/>
      {resident ?
        <LocalAddress orgcode={orgcode} name={`${name}.address`} caption="Address" editable={editable} />
        :
        <NonLocalAddress name={`${name}.address`} caption="Address" editable={editable}  />
      }
    </React.Fragment>
  )
}

export default ResidenceAddress;
