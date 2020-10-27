import React, { useState } from "react";
import {
  Panel,
  Combobox,
  Date,
  Text,
  Subtitle2
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
  defaultType,
  editable=true,
  visibleWhen=true,
  showIdTypes=true,
  disableIdNo=false,
  caption,
  ...rest
}) => {

  if (!visibleWhen) return null;

  const [idTypes, setIdTypes] = useState(idTypeList);
  const [idtype, setIdtype] = useState();

  return (
    <Panel>
      {caption && <Subtitle2>{caption}</Subtitle2>}
      {showIdTypes &&
        <Combobox
          name={`${name}.type`}
          items={idTypes}
          caption="ID Type"
          expr={(item) => item.title}
        />
      }
      <Text name={`${name}.idno`} required={true} caption="ID No." readOnly={disableIdNo} />
      <Text name={`${name}.placeissued`} required={true} caption="Place Issued" />
      <Date name={`${name}.dtissued`} required={true} caption="Date Issued" helperText="mm/dd/yyyy" />
      <Date name={`${name}.dtvalid`} required={true} caption="Validity Date" helperText="mm/dd/yyyy"  />
    </Panel>
  );
};

export default IdEntry;
