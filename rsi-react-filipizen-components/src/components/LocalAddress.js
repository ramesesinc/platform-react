import React from "react";
import { Panel, Text } from "rsi-react-web-components";
import BarangayList from "./BarangayList"

const LocalAddress = ({
  orgcode,
  name,
  editable=true,
  visibleWhen=true,
  ...rest
}) => {

  if (!visibleWhen) return null;

  return (
    <Panel>
      <Panel row>
        <Text name={`${name}.unitno`} caption="Unit No"  editable={editable} />
        <Text name={`${name}.bldgno`}  caption="Building No" editable={editable} />
        <Text name={`${name}.bldgname`}  caption="Building Name" editable={editable} />
      </Panel>
      <Panel row>
        <Text name={`${name}.street`} caption="Street" editable={editable} />
        <Text name={`${name}.subdivision`} caption="Subdivision" editable={editable} />
      </Panel>
      <Panel row>
        {editable ?
          <BarangayList orgcode={orgcode} name={`${name}.barangay`} caption="Barangay" />
          :
          <Text name={`${name}.barangay.name`} caption="Barangay" editable={editable} />
        }
      </Panel>
    </Panel>
  )
}

export default LocalAddress;
