import React from "react";
import MuiAvatar from "@material-ui/core/Avatar";

const Avatar = ({src, ...rest}) => {
  return <MuiAvatar src={src} {...rest} />
};

export default Avatar;
