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
    // minWidth: 200,
    marginTop: 3,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Combobox = ({
  editable = true,
  items,
  caption,
  label,
  expr,
  ...rest
}) => {
  const ctx = useContext();
  const fieldProps = getFieldProps(ctx, rest);
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} fullWidth disabled={!editable} >
      <InputLabel id="select-id">{caption || label || ""}</InputLabel>
      <Select
        labelId="select-id"
        id="select-id"
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
