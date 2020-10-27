import React from "react";
import { Button as MuiButton, CircularProgress } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "none"
  },
}));


const ButtonLink = ({
  caption,
  href,
  children,
  visibleWhen = true,
  disableWhen = false,
  target="_blank",
  Icon,
  ...rest
}) => {
  if (!visibleWhen) return null;

  const classes = useStyles();

  return (
    <MuiButton
      size="small"
      variant="outlined"
      color="primary"
      href={href}
      style={{ margin: 2 }}
      disabled={disableWhen}
      className={classes.button}
      endIcon={Icon && <Icon />}
      target={target}
      {...rest}
    >
      {caption || children}
    </MuiButton>
  );
};

export default ButtonLink;
