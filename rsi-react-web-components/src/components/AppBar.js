import React from 'react'
import MuiAppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#2c3e50'
  },
  container: {
    padding: '4px 50px'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  toolBar: {
    paddingLeft: '50px'
  }
}))

const AppBar = (props) => {
  const classes = useStyles()
  return (
    <MuiAppBar
      variant='outlined'
      position='static'
      className={classes.root}
      style={{ ...props.style }}
    >
      {props.children}
    </MuiAppBar>
  )
}

export default AppBar
