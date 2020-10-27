import React from "react";
// import { Button as MuiButton, CircularProgress } from "@material-ui/core";
import Button from "./Button"

const BackLink = ({
  label,
  caption,
  children,
  ...rest
}) => {

  return (
    <Button size="medium" {...rest} variant="text" >
      {label || caption || children || "Back"}
    </Button>
  );
};

export default BackLink;
