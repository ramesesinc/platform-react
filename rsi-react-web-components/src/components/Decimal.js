import React from "react";
import { TextField } from "@material-ui/core";
import NumberFormat from 'react-number-format';
import { useContext, getFieldProps } from "./DataContext";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

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
      thousandSeparator
      isNumericString
      decimalScale={2}
      fixedDecimalScale={true}
      readOnly={!props.editable || props.readOnly}
      {...other}
    />
  );
}


const Decimal = ({
  label,
  caption,
  editable=true,
  readOnly=false,
  textAlign="right",
  ...rest
}) => {
  const ctx = useContext();
  const fieldProps = getFieldProps(ctx, rest);

  return (
    <TextField
      label={label || caption}
      autoComplete="off"
      readOnly={!editable || readOnly}
      {...rest}
      {...fieldProps}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
      inputProps={{style: {textAlign}}}
    />
  )
};

export default Decimal;
