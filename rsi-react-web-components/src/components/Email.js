import React from 'react'
import { TextField as MuiTextField } from '@material-ui/core'
import { useContext, getFieldProps } from './DataContext'

const Email = ({label, caption, ...rest}) => {
  const ctx = useContext()
  const fieldProps = getFieldProps(ctx, rest)

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    fieldProps.onChange({target: {name, value: value.toLowerCase()}})
  }

  return (
    <MuiTextField
      label={label || caption || 'Email Address'}
      fullWidth
      autoComplete="off"
      {...rest}
      {...fieldProps}
      type='email'
      onChange={onChangeHandler}
    />
  )
}

export default Email
