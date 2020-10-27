import React, { useState } from "react";
import {
  Panel,
  Combobox,
  Date,
  Text,
  Subtitle2
} from "rsi-react-web-components";

const PrcCard = ({
  name,
  editable = true,
  readOnly = false,
  visibleWhen = true,
  disableIdNo = false,
  caption="Professional Regulation Commission [PRC]"
}) => {

  if (!visibleWhen) return null;
  const isReadOnly = readOnly || !editable;
  const isReadOnlyIdNo = isReadOnly || disableIdNo;
  return (
    <Panel>
      {caption && <Subtitle2>{caption}</Subtitle2>}
      <Text name={`${name}.idno`} required={true} caption="ID No." readOnly={isReadOnlyIdNo} />
      <Text name={`${name}.placeissued`} required={true} caption="Place Issued" readOnly={isReadOnly} />
      <Date name={`${name}.dtissued`} required={true} caption="Date Issued" defaultValue={null} readOnly={isReadOnly} />
      <Date name={`${name}.dtvalid`} required={true} caption="Validity Date" defaultValue={null} readOnly={isReadOnly} />
    </Panel>
  );
};

export default PrcCard;
