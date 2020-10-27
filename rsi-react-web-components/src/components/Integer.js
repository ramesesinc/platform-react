import React from "react";
import { TextField } from "@material-ui/core";
import NumberFormat from 'react-number-format';
import { useContext, getFieldProps } from "./DataContext";

function NumberFormatCustom(props) {
  const { inputRef, onChange, thousandSeparator=true, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator={thousandSeparator}
      isNumericString
      decimalScale={0}
    />
  );
}

const Integer = ({label, caption, size="small", ...rest}) => {
  const ctx = useContext();
  const fieldProps = getFieldProps(ctx, rest);

  return (
    <TextField
      label={label || caption}
      size={size}
      autoComplete="off"
      {...rest}
      {...fieldProps}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
    />
  )
};

export default Integer;
