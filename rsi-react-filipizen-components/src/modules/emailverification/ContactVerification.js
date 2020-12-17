import React, { useState } from "react";
import { useData } from "rsi-react-web-components";
import EmailVerification from "./index";

const ContactVerification = ({
  partner,
  moveNextStep,
  movePrevStep,
  title,
  visibleWhen=true,
  emailRequired=false,
  contact={}
}) => {
  if (!visibleWhen) return null;

  const [ctx, dispatch] = useData();
  const [agree, setAgree] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const onVerifyEmail = (contact) => {
    dispatch({type: "SET_CONTACT", contact});
    moveNextStep(contact);
  }

  return <EmailVerification
    emailRequired={false}
    partner={partner}
    title={title}
    onVerify={onVerifyEmail}
    onCancel={movePrevStep}
    emailRequired={emailRequired}
    contact={contact}
  />
};

export default ContactVerification;
