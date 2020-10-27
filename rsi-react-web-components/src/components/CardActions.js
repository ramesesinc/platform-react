import React from 'react'
import { CardActions as MuiCardActions } from '@material-ui/core'

const CardActions = (props) => {
  return <MuiCardActions>{props.children}</MuiCardActions>
}

export default CardActions
