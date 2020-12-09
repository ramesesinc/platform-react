import React, { useState } from "react";
import {
  Panel,
  isDateAfter,
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
  onError=()=>{},
  caption="Professional Tax Receipt [PTR]"
}) => {

  if (!visibleWhen) return null;
  const isReadOnly = readOnly || !editable;
  const isReadOnlyRefNo = isReadOnly || disableRefNo;

  const [errors, setErrors] = useState({});

  const validateDateIssued = (e) => {
    setErrors({});
    const dtIssued = e.target.value;
    if (dtIssued) {
      if (isDateAfter(dtIssued)) {
        setErrors({...errors, dtissued: "Date issued should be on or before this day"});
        onError(true);
      } else {
        onError(false);
      }
    }
  }


  return (
    <Panel>
      {caption && <Subtitle2>{caption}</Subtitle2>}
      <Text name={`${name}.refno`} required={true} caption="Receipt No." readOnly={isReadOnlyRefNo} />
      <Text name={`${name}.placeissued`} required={true} caption="Place Issued" readOnly={isReadOnly} />
      <Date name={`${name}.dtissued`} required={true} caption="Date Issued" defaultValue={null} readOnly={isReadOnly} helperText="mm/dd/yyyy" onBlur={validateDateIssued} error={errors.dtissued} helperText={errors.dtissued} disableFuture={true}/>
    </Panel>
  );
};

export default PtrCard;
