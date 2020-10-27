import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MaskedInput from 'react-text-mask';
import { useContext, getFieldProps } from './DataContext'

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


const Mobileno = ({label, caption, ...rest}) => {
  const ctx = useContext()
  const fieldProps = getFieldProps(ctx, rest)

  return (
    <FormControl>
      <InputLabel htmlFor="formatted-text-mask-input">{label || caption || "Mobile No."}</InputLabel>
      <Input
        {...rest}
        {...fieldProps}
        id="formatted-text-mask-input"
        inputComponent={MobilenoMask }
      />
    </FormControl>
  )
}

export default Mobileno
