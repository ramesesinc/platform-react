import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "./Button";

const MsgBox = ({ open, type = "alert", msg, acceptCaption="OK", onAccept, onCancel, ...rest }) => {
  const title = rest.title || (type === "alert" ? "Information" : "Confirmation")
  return (
    <Dialog open={open}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{msg}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {type !== "alert" && (
          <Button variant="text" caption="Cancel" onClick={onCancel} />
        )}
        <Button caption={acceptCaption} onClick={onAccept} />
      </DialogActions>
    </Dialog>
  );
};

export default MsgBox;
