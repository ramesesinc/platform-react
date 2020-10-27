import React from "react";
import Label from "./Label";

const Error = ({ msg }) => {
  if (!msg) return null;
  return <Label style={{ color: "red" }}>{msg}</Label>;
};

export default Error;
