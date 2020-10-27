import React, { useState } from "react";
import {
  Panel,
  Combobox,
  Date,
  Text,
  Subtitle2
} from "rsi-react-web-components";

const PtrCard = ({
  name,
  editable = true,
  readOnly = false,
  visibleWhen = true,
  disableRefNo = false,
  caption="Professional Tax Receipt [PTR]"
}) => {

  if (!visibleWhen) return null;
  const isReadOnly = readOnly || !editable;
  const isReadOnlyRefNo = isReadOnly || disableRefNo;
  return (
    <Panel>
      {caption && <Subtitle2>{caption}</Subtitle2>}
      <Text name={`${name}.refno`} required={true} caption="Receipt No." readOnly={isReadOnlyRefNo} />
      <Text name={`${name}.placeissued`} required={true} caption="Place Issued" readOnly={isReadOnly} />
      <Date name={`${name}.dtissued`} required={true} caption="Date Issued" defaultValue={null} readOnly={isReadOnly} />
    </Panel>
  );
};

export default PtrCard;
