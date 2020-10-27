import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MuiSwitch from "@material-ui/core/Switch";

const Switch = ({ caption, onChange, ...rest }) => {
  const handleChange = (event) => {
    onChange(event.target.checked);
  };

  return (
    <FormControlLabel
      control={<MuiSwitch color="primary" {...rest} onChange={handleChange} />}
      label={caption}
    />
  );
};

export default Switch;
