import React from "react";
import { Panel, Text } from "rsi-react-web-components";

const NonLocalAddress = ({
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
        <Text name={`${name}.barangay.name`} caption="Barangay" editable={editable} />
        <Text name={`${name}.citymunicipality`} caption="City/Municipality" editable={editable} />
        <Text name={`${name}.province`} caption="Province" editable={editable} />
      </Panel>
    </Panel>
  )
}

export default NonLocalAddress;
