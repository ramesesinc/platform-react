import React from "react";
import { TextField } from "@material-ui/core";
import { useContext, getFieldProps } from "./DataContext";

const Text = ({
  label,
  caption,
  visibleWhen = true,
  editable = true,
  readOnly = false,
  containerStyle,
  textCase="UPPER",
  blur = false,
  ...rest
}) => {
  if (!visibleWhen) return null;

  const ctx = useContext();
  const fieldProps = getFieldProps(ctx, rest);

  const inputProps = {};
  if (readOnly || !editable) {
    inputProps.readOnly = true;
  }

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    if (/upper/i.test(textCase)) {
      fieldProps.onChange({target: {name, value: value.toUpperCase()}})
    } else {
      fieldProps.onChange(e);
    }
  }

  const blurStyle = blur === true ? styles.blur : {}

  return (
    <div style={{ ...styles.root, ...containerStyle }}>
      <TextField
        label={caption || label}
        fullWidth
        inputProps={inputProps}
        autoComplete="off"
        helperText={rest.error}
        size="small"
        {...rest}
        {...fieldProps}
        style={{...blurStyle}}
        onChange={onChangeHandler}
      />
    </div>
  );
};

const styles = {
  root: {
    width: "100%",
    marginBottom: 3,
  },
  blur: {
    filter: "blur(3px)",
    "-webkit": "blur(3px)",
  }
};

export default Text;
