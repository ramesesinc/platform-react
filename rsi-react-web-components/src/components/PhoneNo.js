import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MaskedInput from 'react-text-mask';
import { useContext, getFieldProps } from './DataContext'

function PhoneNoMask(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      {...other}
    />
  );
}


const PhoneNo = ({label, caption, ...rest}) => {
  const ctx = useContext()
  const fieldProps = getFieldProps(ctx, rest)

  return (
    <FormControl>
      <InputLabel htmlFor="formatted-text-mask-input">{label || caption || "Phone No."}</InputLabel>
      <Input
        {...rest}
        {...fieldProps}
        id="formatted-text-mask-input"
        inputComponent={PhoneNoMask }
      />
    </FormControl>
  )
}

export default PhoneNo
