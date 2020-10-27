import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import MuiSelect from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import shortid from "shortid";
import _object from "lodash/object";

import { useContext, getFieldProps } from "./DataContext";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const getChildren = (items, expr) => {
  return items.map((item) => {
    let caption;
    if (typeof expr === "function") {
      caption = expr(item);
    }
    if (typeof expr === "string" && typeof item === "object") {
      caption = _object.get(item, expr);
    }
    return (
      <MenuItem key={shortid.generate()} value={item}>
        {caption || item}
      </MenuItem>
    );
  });
};

const Select = (props) => {
  const ctx = useContext();
  const fieldProps = getFieldProps(ctx, props);
  const { caption, items, name, expr, ...rest } = props;
  const classes = useStyles();
  const children = getChildren(items, expr);
  if (expr) {
    fieldProps.renderValue = (item) => item[expr];
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{caption}</InputLabel>
      <MuiSelect {...rest} {...fieldProps} name={name}>
        {children}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
