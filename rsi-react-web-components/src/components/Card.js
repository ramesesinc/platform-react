import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card as MuiCard } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    padding: 10,
  },

});

const Card = ({ caption, children }) => {
  const classes = useStyles();
  return (
    <MuiCard className={classes.root}>
      {caption && (
        <Typography variant="h6" component="h3" className={classes.title}>
          {caption}
        </Typography>
      )}
      <CardContent>{children}</CardContent>
    </MuiCard>
  );
};

export default Card;
