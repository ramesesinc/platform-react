import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ReactMaskedInput from 'react-text-mask';
import { useContext, getFieldProps } from './DataContext'

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: 3,
  },
}));

function Mask({
  inputRef,
  ...other
}) {
  return (
    <ReactMaskedInput
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      guide={true}
      {...other}
    />
  );
}

const padLeft = (value, padLength, padChar) => {
  let padding = "";
  while(padLength >0) {
    padding += padChar;
    padLength--;
  }
  return padding+value;
}

const MaskedInput = ({
  label,
  caption,
  mask=[/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/],
  len=7,
  placeholderChar=" ",
  showMask=false,
  required=false,
  autoFocus,
  ...rest
}) => {
  const ctx = useContext()
  const fieldProps = getFieldProps(ctx, rest)

  const classes = useStyles();

  const onBlur = (evt) => {
    let {name, value} = evt.target;
    let unmaskedValue = value.replace(new RegExp(placeholderChar, "gi"), "");;
    mask.forEach(msk => {
      if (typeof msk === "string") {
        unmaskedValue = unmaskedValue.replace(new RegExp(msk, "gi"), "");
      }
    })
    const newValue = padLeft(unmaskedValue, len - unmaskedValue.length, "0");
    fieldProps.onChange({target: {name, value: newValue}})
  }

  return (
    <FormControl className={classes.formControl} fullWidth>
      <InputLabel required={required} htmlFor="formatted-text-mask">{label || caption}</InputLabel>
      <Input
        id="formatted-text-mask"
        required={required}
        onBlur={onBlur}
        mask={mask}
        {...rest}
        {...fieldProps}
        inputComponent={Mask}
        inputProps={{mask, showMask, placeholderChar, autoFocus}}
      />
    </FormControl>
  )
}

export default MaskedInput
