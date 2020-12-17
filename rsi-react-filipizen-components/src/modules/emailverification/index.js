import React, { useState, useRef } from "react";
import {
  FormPanel,
  Card,
  Panel,
  Text,
  Mobileno,
  Email,
  ActionBar,
  Button,
  Error,
  Spacer,
  Subtitle,
  BackLink,
  Title,
  MsgBox,
  Service
} from "rsi-react-web-components";

import { isVisible } from "rsi-react-web-components";

const EmailVerification = ({
  partner,
  onVerify,
  onCancel,
  connection="epayment",
  visibleWhen=true,
  history,
  showName,
  module,
  title,
  emailRequired,
  contact: initialContact
}) => {
  if (!visibleWhen) return null;

  const [hiddenCode, setHiddenCode] = useState();
  const [contact, setContact] = useState(initialContact);
  const [contactError, setContactError] = useState({});
  const [keycode, setKeycode] = useState();
  const [error, setError] = useState();
  const [verifying, setVerifying] = useState(false);
  const [isResendCode, setIsResendCode] = useState(false);

  const verifyEmail = async () => {
    const emailSvc = Service.lookupAsync(`${partner.id}:VerifyEmailService`, connection);
    return emailSvc.invoke("verifyEmail", { email: contact.email, mobileno: contact.mobileno });
  };

  const submitInfo = () => {
    if (!formRef.current.reportValidity()) return;
    if (!contact.email && !contact.mobileno) {
      setError("Please specify email or Mobile No.");
      return;
    }

    setError(null);
    setVerifying(true);
    verifyEmail()
      .then((data) => {
        setHiddenCode(data.key);
        setVerifying(false);
      })
      .catch((err) => {
        setError(err);
        setVerifying(false);
      });
  };

  const resendCode = () => {
    setError(null);
    verifyEmail()
      .then((data) => {
        setHiddenCode(data.key);
        setIsResendCode(false);
      })
      .catch((err) => {
        setError(err);
        setIsResendCode(false);
      });
  }

  const verifyCode = () => {
    if (hiddenCode !== keycode) {
      setError("Code is incorrect");
    } else {
      onVerify(contact);
    }
  };

  const goBack = () => {
    if (typeof onCancel === "function") {
      onCancel();
    }
    if (history) {
      history.goBack();
    }
  };

  const formRef = useRef();

  const moduleTitle = module && module.title || title || null;

  return (
    <Card>
      {moduleTitle && <Title>{moduleTitle}</Title>}
      <Subtitle>Email Verification</Subtitle>
      <Spacer />
      <Error msg={error} />

      <FormPanel visibleWhen={!hiddenCode} context={contact} handler={setContact}>
        <form ref={formRef}>
          {showName === true && (
            <React.Fragment>
              <Text label="Full Name" name="name" autoFocus={true} required={true} />
              <Text label="Address" name="address" required={true} />
            </React.Fragment>
          )}
          <Email name="email" required={emailRequired} error={contactError.email} helperText={contactError.email} autoFocus={!showName} />
          <Mobileno name="mobileno" />
          <ActionBar disabled={verifying}>
            <BackLink action={goBack} />
            <Button label="Submit" action={submitInfo} loading={verifying} />
          </ActionBar>
        </form>
      </FormPanel>

      <MsgBox open={isResendCode}
        title="Email Verification"
        msg="Resend verification code?"
        onAccept={resendCode}
        onCancel={() => setIsResendCode(false)} />

      <Panel visibleWhen={!!hiddenCode}>
        <Text
          label="Email Code"
          placeholder="Enter code sent to your email"
          name="keycode"
          value={keycode}
          onChange={setKeycode}
          maxLength={6}
          autoFocus={true}
        />
        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
          <Button label="Resend Code" action={()=>setIsResendCode(true)} variant="text" />
        </div>
        <ActionBar>
          <Button label="Verify" visibleWhen={hiddenCode} action={verifyCode} />
        </ActionBar>
      </Panel>
    </Card>
  );
};

export default EmailVerification;
