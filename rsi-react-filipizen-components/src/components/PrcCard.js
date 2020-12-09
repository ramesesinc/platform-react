import React, { useState, useEffect } from "react";
import {
  Panel,
  Date,
  Text,
  Subtitle2,
  isDateAfter,
  isDateBefore
} from "rsi-react-web-components";

const PrcCard = ({
  name,
  dtIssued: initialDtIssued,
  editable = true,
  readOnly = false,
  visibleWhen = true,
  disableIdNo = false,
  onError=()=>{},
  caption="Professional Regulation Commission [PRC]"
}) => {

  if (!visibleWhen) return null;
  const isReadOnly = readOnly || !editable;
  const isReadOnlyIdNo = isReadOnly || disableIdNo;

  const [errors, setErrors] = useState({});
  const [dtIssued, setDtIssued] = useState(initialDtIssued);

  useEffect(() => {
    setDtIssued(initialDtIssued);
  }, initialDtIssued)

  const validateDateIssued = (e) => {
    setErrors({});
    setDtIssued(null);
    const dtIssued = e.target.value;
    if (dtIssued) {
      if (isDateAfter(dtIssued)) {
        setErrors({...errors, dtissued: "Date issued should be on or before this day"});
        onError(true, "prc.dtissued");
      } else {
        setDtIssued(dtIssued);
        onError(false);
      }
    }
  }

  const validateDateValidity = (e) => {
    const dtValid = e.target.value;
    if (dtValid) {
      if (isDateBefore(dtValid, dtIssued)) {
        setErrors({...errors, dtvalid: "Date should be after date issued"});
        onError(true);
      } else {
        setErrors({...errors, dtvalid: null});
        onError(false);
      }
    }
  }

  return (
    <Panel>
      {caption && <Subtitle2>{caption}</Subtitle2>}
      <Text name={`${name}.idno`} required={true} caption="ID No." readOnly={isReadOnlyIdNo} />
      <Text name={`${name}.placeissued`} required={true} caption="Place Issued" readOnly={isReadOnly} />
      <Date name={`${name}.dtissued`} required={true} caption="Date Issued" defaultValue={null} readOnly={isReadOnly} helperText="mm/dd/yyyy" onBlur={validateDateIssued} error={errors.dtissued} helperText={errors.dtissued} disableFuture={true} />
      <Date name={`${name}.dtvalid`} required={true} caption="Validity Date" defaultValue={null} readOnly={isReadOnly}  helperText="mm/dd/yyyy" onBlur={validateDateValidity} error={errors.dtvalid} helperText={errors.dtvalid} disabled={!dtIssued} disablePast={true} />
    </Panel>
  );
};

export default PrcCard;
