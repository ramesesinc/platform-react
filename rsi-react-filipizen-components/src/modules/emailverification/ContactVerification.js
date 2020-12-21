import React, { useState } from "react";
import { useData } from "rsi-react-web-components";
import EmailVerification from "./index";

const ContactVerification = ({
  partner,
  moveNextStep,
  movePrevStep,
  title,
  subtitle="Email Verification",
  visibleWhen=true,
  emailRequired=false,
  showName=false,
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
    subtitle={subtitle}
    onVerify={onVerifyEmail}
    onCancel={movePrevStep}
    emailRequired={emailRequired}
    contact={contact}
    showName={showName}
  />
};

export default ContactVerification;
