import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MuiCheckbox from "@material-ui/core/Checkbox";
import { useContext, getFieldProps } from "./DataContext";

const Checkbox = ({
  visibleWhen = true,
  editable = true,
  readOnly = false,
  text,
  caption,
  ...rest
}) => {
  const ctx = useContext();
  const fieldProps = getFieldProps(ctx, rest);

  let disabled = false;
  if (readOnly || !editable) {
    disabled = true;
  }

  const handleChange = (evt) => {
    fieldProps.onChange(evt, true);
  };

  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          checked={typeof(fieldProps.value) === "string" ? false : fieldProps.value }
          disabled={disabled}
          {...rest}
          {...fieldProps}
          onChange={handleChange}
        />
      }
      label={text || caption}
    />
  );
};

export default Checkbox;
