import React from 'react'
import { TextField } from '@material-ui/core'
import { useContext, getFieldProps } from './DataContext'

const Password = (props) => {
  const ctx = useContext()
  const fieldProps = getFieldProps(ctx, props)

  return (
    <TextField
      label={props.label || props.caption || 'Password'}
      fullWidth
      {...props}
      {...fieldProps}
      type='password'
    />
  )
}

export default Password
