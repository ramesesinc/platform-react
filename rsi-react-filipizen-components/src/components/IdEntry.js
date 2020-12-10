import React, { useState, useEffect } from "react";
import {
  Panel,
  Combobox,
  Date,
  Text,
  Subtitle2,
  isDateAfter,
  isDateBefore
} from "rsi-react-web-components";

const idTypeList = [
  { name: "ctc", title: "Community Tax Certficate", caption: "CTC No" },
  { name: "drivers", title: "Drivers License", caption: "License No" },
  { name: "sss", title: "SSS", caption: "SSS No" },
  { name: "gsis", title: "GSIS", caption: "GSIS No" },
  { name: "umid", title: "UMID", caption: "UMID No" },
  { name: "passport", title: "PASSPORT", caption: "Passport No." },
  { name: "tin", title: "TIN", caption: "TIN" }
];

const IdEntry = ({
  name,
  dtIssued: initialDtIssued,
  defaultType,
  editable=true,
  visibleWhen=true,
  showIdTypes=true,
  disableIdNo=false,
  caption,
  onError=()=>{},
}) => {

  if (!visibleWhen) return null;

  const [idTypes] = useState(idTypeList);
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
        onError(true, "id.dtissued");
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
      {showIdTypes &&
        <Combobox
          name={`${name}.type`}
          items={idTypes}
          caption="ID Type"
          expr={(item) => item.title}
          required={true}
        />
      }
      <Text name={`${name}.idno`} required={true} caption="ID No." readOnly={disableIdNo} />
      <Text name={`${name}.placeissued`} required={true} caption="Place Issued" />
      <Date name={`${name}.dtissued`} required={true} caption="Date Issued" helperText="mm/dd/yyyy" onBlur={validateDateIssued} error={errors.dtissued} helperText={errors.dtissued} disableFuture={true} />
      <Date name={`${name}.dtvalid`} caption="Validity Date" helperText="mm/dd/yyyy" onBlur={validateDateValidity} error={errors.dtvalid} helperText={errors.dtvalid} disabled={!dtIssued} disablePast={true} />
    </Panel>
  );
};

export default IdEntry;
