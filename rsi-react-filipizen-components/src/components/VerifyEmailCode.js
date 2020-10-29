import React, { useState } from "react";
import {
  FormPanel,
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
  MsgBox
} from "rsi-react-web-components";


const VerifyEmailCode = ({
  partner,
  hiddenCode,
  email,
  onCancel,
  onVerified
}) => {
  const [keycode, setKeycode] = useState();
  const [error, setError] = useState();
  const [isResendCode, setIsResendCode] = useState(false);

  const verifyEmail = async () => {
    const emailSvc = Service.lookupAsync(`${partner.id}:VerifyEmailService`, "epayment");
    return emailSvc.invoke("verifyEmail", { email });
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
    //TODO: remove comment and test code
    // if (hiddenCode !== keycode) {
    //   setError("Code is incorrect");
    // } else {
    //   onVerified();
    // }

    onVerified();
  };

  return (
    <Panel>
      <Error msg={error} />
      <MsgBox open={isResendCode}
        title="Email Verification"
        msg="Resend verification code?"
        onAccept={resendCode}
        onCancel={() => setIsResendCode(false)}
      />

      <Panel>
        <Panel style={styles.container}>
          <Text
            label="Key"
            placeholder="Enter code sent to your email"
            name="keycode"
            value={keycode}
            onChange={setKeycode}
            maxLength={6}
            fullWidth={false}
            variant="outlined"
          />
          <Button label="Resend Code" action={()=>setIsResendCode(true)} variant="text" />
        </Panel>
        <ActionBar>
          <Button caption="Verify" action={verifyCode} />
        </ActionBar>
      </Panel>
    </Panel>
  );
};

const styles = {
  container: {
  },
}

export default VerifyEmailCode;
