import React from "react";
import {
  Subtitle2,
  Panel,
  Text,
  Email,
  Mobileno,
  PhoneNo,
  Date,
  Spacer
} from "rsi-react-web-components";
import ResidenceAddress from "./ResidenceAddress";
import IdEntry from "./IdEntry";
import Gender from "./Gender";

const Person = ({
  name,
  showTitle = false,
  person,
  editable,
  orgcode,
  title="Personal Information",
  showIdEntry=false,
  showAddress=false,
  showExtended=false
}) => {

  return (
    <React.Fragment>
      {showTitle && <Subtitle2>{title}</Subtitle2> }
      <Panel>
        <Text caption="Last Name" name={`${name}.lastname`} editable={editable} required={true} />
        <Text caption="First Name" name={`${name}.firstname`} editable={editable} required={true} />
        <Text caption="Middle Name" name={`${name}.middlename`} editable={editable} />
        {showExtended && (
          <React.Fragment>
            <Date caption="Birth Date" name={`${name}.birthdate`} editable={editable} />
            <Gender name={`${name}.gender`} editable={editable} />
            <Text caption="TIN" name={`${name}.tin`} editable={editable} />
            <Spacer />
          </React.Fragment>
        )}
        {showAddress && <ResidenceAddress person={person} orgcode={orgcode} name={name} editable={editable} /> }
        <Email name={`${name}.email`} />
        <Mobileno name={`${name}.mobileno`} />
        <PhoneNo name={`${name}.phoneno`} />
        {showIdEntry && <IdEntry name={`${name}.id`} editable={editable} /> }
      </Panel>
    </React.Fragment>
  );
};

export default Person;
