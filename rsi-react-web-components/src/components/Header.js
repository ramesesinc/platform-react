import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#ecf0f1'
  },
  container: {
    padding: '4px 50px'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
}))

export default function Header({ children }) {
  const classes = useStyles()
  return (
    <AppBar variant='outlined' position='static' className={classes.root}>
      {children}
    </AppBar>
  )
}
