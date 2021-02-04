import React, { useState, useEffect } from "react";
import {
  Card,
  Panel,
  Spacer,
  Button,
  Title,
  Content,
  Label,
  FormPanel,
  Text,
  ActionBar,
  currencyFormat,
  MsgBox
} from "rsi-react-web-components";

const CheckoutOrder = ({ onCancel, onSubmit, bill, loading, error: paymentError }) => {
  const [payee, setPayee] = useState({});
  const [errors, setErrors] = useState({});
  const [showMsg, setShowMsg] = useState(false);


  useEffect(() => {
    setShowMsg(paymentError !== null && paymentError !== undefined);
  }, [paymentError])

  const confirmOrder = () => {
    const errs = {}
    if (!payee.paidby) {
      errs.paidby = "Required";
    }
    if (!payee.paidbyaddress) {
      errs.paidbyaddress = "Required";
    }
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onSubmit(payee);
    }
  }

  return (
    <Card>
      <Panel style={{maxWidth: 400}}>
        <Content center>
          <Title>Confirm Transaction</Title>
          <Spacer />
          <Label style={{ ...styles.text }}>
            Please confirm and fill up name and address of the payer for your
            electronic official receipt and click Continue to proceed for payment.
          </Label>
          <Spacer />
        </Content>
        <FormPanel context={payee} handler={setPayee}>
          <Text name="paidby" caption="Paid By Name" required error={errors.paidby} helperText={errors.paidby} autoFocus={true} />
          <Text name="paidbyaddress" caption="Paid By Address" required error={errors.paidbyaddress} helperText={errors.paidbyaddress} />
        </FormPanel>
        <Spacer />
        <Panel style={styles.infoContainer}>
          <div style={{...styles.infoContainer, ...{alignItems: "center"}}}>
            <label>Payment Details</label>
            <h4>{bill.paymentdetails}</h4>
          </div>
          <div style={styles.amountContainer}>
            <label style={styles.amount}>Php {currencyFormat(bill.amount)}</label>
          </div>
        </Panel>
        <Spacer />
        <MsgBox
          open={showMsg}
          title="Error"
          onAccept={() => setShowMsg(false)}
          msg={`An error was encountered when processing your order. Please try again later or contact LGU for assistance.`} />
        <ActionBar>
          <Button variant="text" caption="Back" action={onCancel} />
          <Button caption="Continue" action={confirmOrder} disableWhen={loading} loading={loading}/>
        </ActionBar>
      </Panel>
    </Card>
  );
};

const styles = {
  text: {
    display: "block",
    textAlign: "center"
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
  },
  amountContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #aaa",
  },
  amount: {
    fontSize: 24,
    fontWeight: 800,
    padding: 10,
  }
};

export default CheckoutOrder;
