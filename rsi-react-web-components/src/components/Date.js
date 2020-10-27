import React, { useState, useEffect } from "react";
import { useContext, getFieldProps } from "./DataContext";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { padLeft } from "../lib/util"

const CustomDate = ({
  visibleWhen = true,
  caption,
  label,
  editable = true,
  readOnly = false,
  autoOk=true,
  helperText="mm/dd/yyy",
  variant="standard",
  size="small",
  ...rest
}) => {
  if (!visibleWhen) return null;

  const ctx = useContext();
  const fieldProps = getFieldProps(ctx, rest);
  const { value, onChange, ...restFieldProps} = fieldProps;

  const [localValue, setLocalValue] = useState(null);

  useEffect(() => {
    if (!localValue && value !== null && value.toString().length > 0) {
      let convertedValue;
      if (value.indexOf(" ") > 0) {
        convertedValue = new Date(value.split(" ")[0] + "T00:00:00+08:00");
      } else {
        convertedValue = new Date(`${value}T00:00:00+08:00`);
      }
      setLocalValue(convertedValue);
    }
  }, [value])

  const changeHandler = (dt) => {
    setLocalValue(dt);
    let val = null;
    if (dt && !/invalid/i.test(dt.toString())) {
      const sdt = dt.toLocaleDateString();
      const tokens = sdt.split("/")
      tokens[0] = padLeft(tokens[0], 2);
      tokens[1] = padLeft(tokens[1], 2);
      val = `${tokens[2]}-${tokens[0]}-${tokens[1]}`
    }
    onChange({target: {name: rest.name, value: val}})
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        format="MM/dd/yyyy"
        variant="inline"
        margin="normal"
        inputVariant={variant}
        size={size}
        label={caption || label}
        helperText={helperText}
        fullWidth={true}
        autoOk={autoOk}
        {...rest}
        {...restFieldProps}
        value={localValue}
        onChange={changeHandler}
        disabled={!editable || readOnly}
      />
    </MuiPickersUtilsProvider>
  );
};

export default CustomDate;
