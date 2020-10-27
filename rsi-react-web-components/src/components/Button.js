import React from "react";
import { Button as MuiButton, CircularProgress } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "none"
  },
}));


const Button = ({
  label,
  caption,
  action,
  loading,
  children,
  visibleWhen = true,
  disableWhen = false,
  ...rest
}) => {
  if (!visibleWhen) return null;

  const classes = useStyles();

  return (
    <MuiButton
      size="small"
      variant="contained"
      color="primary"
      onClick={action}
      style={{ margin: 2 }}
      disabled={disableWhen}
      endIcon={loading && <CircularProgress size={18} color="secondary" {...rest} />}
      className={classes.button}
      {...rest}
    >
      {label || caption || children}
    </MuiButton>
  );
};

export default Button;
