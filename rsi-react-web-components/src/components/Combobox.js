import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import { useContext, getFieldProps } from "./DataContext";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: 3,
  },
}));

const Combobox = ({
  editable = true,
  required=false,
  items,
  caption,
  expr,
  ...rest
}) => {
  const ctx = useContext();
  const fieldProps = getFieldProps(ctx, rest);
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} fullWidth disabled={!editable} >
      <InputLabel required={required} id="select-id">{caption}</InputLabel>
      <Select
        labelId="select-id"
        id="select-id"
        required={required}
        {...rest}
        {...fieldProps}
      >
      { items.map(item => {
          const itemText = (typeof expr === "function" ? expr(item) : item.toString());
          return <MenuItem key={itemText} value={item}>{itemText}</MenuItem>
        })
      }
      </Select>
      <FormHelperText style={{color: "red"}}>{rest.helperText}</FormHelperText>
    </FormControl>
  );
};

export default Combobox;
