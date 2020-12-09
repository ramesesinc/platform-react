import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MaskedInput from 'react-text-mask';
import { useContext, getFieldProps } from './DataContext'

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: 3,
  },
}));

function MobilenoMask(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /\d/, /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      {...other}
    />
  );
}


const Mobileno = ({label, caption, required=false, ...rest}) => {
  const ctx = useContext()
  const fieldProps = getFieldProps(ctx, rest)

  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} fullWidth>
      <InputLabel required={required} htmlFor="formatted-text-mask-input">{label || caption || "Mobile No."}</InputLabel>
      <Input
        required={required}
        {...rest}
        {...fieldProps}
        id="formatted-text-mask-input"
        inputComponent={MobilenoMask }
      />
    </FormControl>
  )
}

export default Mobileno
