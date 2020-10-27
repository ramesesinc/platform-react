import React from 'react'
import Label from './Label'

const Subtitle = ({ caption, title, children, style }) => {
  return <Label labelStyle={{...styles.title, ...style}}>{caption || title || children}</Label>
}

const styles = {
  title: {
    paddingTop: '10px',
    color: '#27ae60',
    fontSize: 20,
    fontWeight: 'bold'
  }
}

export default Subtitle
