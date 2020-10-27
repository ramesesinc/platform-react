import React, { useState } from "react";
import MuiRadio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Panel from "./Panel"

import { useContext, getFieldProps } from "./DataContext";

const CustomItem = ({item, Control}) => {
  return (
    <div style={styles.customItemContainer}>
      <MuiRadio value={item.objid} />
      <Control item={item} />
    </div>
  )
}

const Radio = ({
  children,
  caption,
  readOnly = false,
  editable = true,
  list,
  Control,
  ...rest
}) => {

  const ctx = useContext();
  const fieldProps = getFieldProps(ctx, rest);

  const disabled = readOnly || !editable;

  let items;

  if (list) {
    items = list.map(item => {
      if (Control) {
        return (<CustomItem item={item} Control={Control}/>);
      }
      return (
        <FormControlLabel
          value={item.objid}
          control={<MuiRadio />}
          label={item.caption || item.title}
          disabled={disabled}
        />
      );
    });
  } else {
    items = React.Children.map(children, (child) => {
      const { readOnly = false, editable = true, ...rest} = child.props;
      return (
        <FormControlLabel
          value={child.props.value}
          control={<MuiRadio />}
          label={child.props.caption}
          disabled={disabled || readOnly || !editable}
          {...rest}
        />
      );
    });

  }


  const handleChange = (evt, value) => {
    fieldProps.onChange({target: {name: rest.name, value}});
  }

  return (
    <FormControl component="fieldset">
      <RadioGroup {...rest} value={fieldProps.value} onChange={handleChange} style={{display: "flex"}} >
        {items}
      </RadioGroup>
    </FormControl>
  );
};


const styles = {
  customItemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    border: "1px solid #aaa",
  }
}

export default Radio;
