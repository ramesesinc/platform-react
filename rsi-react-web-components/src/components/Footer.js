import React from 'react'
import { Box as MuiBox } from '@material-ui/core'

const style = {
  backgroundColor: '#ecf0f1',
  borderTop: '3px solid #2c3e50',
  textAlign: 'center',
  padding: '10px',
  position: 'fixed',
  left: '0',
  bottom: '0',
  width: '100%'
}

const Footer = ({ children }) => {
  return <MuiBox style={style}>{children}</MuiBox>
}

export default Footer
