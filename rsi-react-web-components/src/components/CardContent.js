import React from "react";
import { CardContent as MuiCardContent } from "@material-ui/core";

const CardContent = (props) => {
  return (
    <MuiCardContent style={{ alignItems: "center" }}>
      {props.children}
    </MuiCardContent>
  );
};

export default CardContent;
