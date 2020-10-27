import React, { useState } from "react";
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

const EmailVerification = (props) => {
  if (!isVisible(props.visibleWhen)) return null;

  const [hiddenCode, setHiddenCode] = useState();
  const [contact, setContact] = useState({});
  const [contactError, setContactError] = useState({});
  const [keycode, setKeycode] = useState();
  const [error, setError] = useState();
  const [verifying, setVerifying] = useState(false);
  const [isResendCode, setIsResendCode] = useState(false);

  const { partner, onVerify, onCancel } = props;

  const verifyEmail = async () => {
    const emailSvc = await Service.lookupAsync(`${partner.id}:VerifyEmailService`);
    return emailSvc.verifyEmail({ email: contact.email, mobileno: contact.mobileno });
  };

  const submitInfo = () => {
    if (contact && contact.email) {
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
    } else {
      setContactError({email: "A valid email is required."});
    }
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
    if (props.history) {
      props.history.goBack();
    }
  };

  const title = props.module && props.module.title || props.title || null;

  return (
    <Card>
      {title && <Title>{title}</Title>}
      <Subtitle>Email Verification</Subtitle>
      <Spacer />
      <Error msg={error} />

      <FormPanel visibleWhen={!hiddenCode} context={contact} handler={setContact}>
        {props.showName === true && (
          <React.Fragment>
            <Text label="Full Name" name="name" autoFocus={true} />
            <Text label="Address" name="address" />
          </React.Fragment>
        )}
        <Email name="email" required error={contactError.email} helperText={contactError.email} />
        <Mobileno name="mobileno" />
        <ActionBar disabled={verifying}>
          <BackLink action={goBack} />
          <Button label="Submit" action={submitInfo} loading={verifying} />
        </ActionBar>
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
