import React from 'react'
import { Button as MuiButton, CircularProgress } from '@material-ui/core'
import { isVisible } from '../lib/util'

const ProgressButton = ({
  label,
  caption,
  loading = false,
  visibleWhen = false,
  children,
  ...rest
}) => {
  if (!visibleWhen) return null

  return (
    <MuiButton size='small' variant='contained' color='primary' {...rest}>
      {label || caption || children} &nbsp;
      {loading && <CircularProgress size={18} color='secondary' {...rest} />}
    </MuiButton>
  )
}

export default ProgressButton
