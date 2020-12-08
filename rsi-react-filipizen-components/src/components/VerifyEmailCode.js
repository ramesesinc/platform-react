import React, { useState } from "react";
import {
  Panel,
  Text,
  ActionBar,
  Button,
  Error,
  Service,
  MsgBox,
  BackLink
} from "rsi-react-web-components";


const VerifyEmailCode = ({
  partner,
  hiddenCode,
  email,
  onCancel,
  onVerified,
  onResendCode=()=>{},
  connection="epayment"
}) => {
  const [keycode, setKeycode] = useState();
  const [error, setError] = useState();
  const [isResendCode, setIsResendCode] = useState(false);

  const verifyEmail = async () => {
    const emailSvc = Service.lookupAsync(`${partner.id}:VerifyEmailService`, connection);
    return emailSvc.invoke("verifyEmail", { email });
  };

  const resendCode = () => {
    setError(null);
    verifyEmail()
      .then((data) => {
        onResendCode(data.key);
        setIsResendCode(false);
      })
      .catch((err) => {
        setError(err);
        setIsResendCode(false);
      });
  }

  const verifyCode = () => {
    setError(null);
    console.log(hiddenCode + "89");
    if (hiddenCode !== keycode) {
      setError("Invalid code");
    } else {
      onVerified();
    }
  };

  return (
    <Panel>
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
            error={error}
            helperText={error}
          />
          <Button label="Resend Code" action={()=>setIsResendCode(true)} variant="text" />
        </Panel>
        <ActionBar>
          <BackLink caption="Cancel" action={onCancel} />
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
