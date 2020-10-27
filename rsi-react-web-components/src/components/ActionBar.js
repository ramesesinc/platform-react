import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 50,
    borderTop: "solid 1px lightgrey",
  },
  center: {
    flexDirection: "column"
  }
}));

const ActionBar = ({
  children,
  disabled = false,
  center = false,
  visibleWhen = true,
  ...rest
}) => {

  if (!visibleWhen) return null;

  const classes = useStyles();
  let classNames = `${classes.container}`;
  if (center !== undefined && center == true) {
    classNames = `${classNames} ${classes.center}`;
  }

  return (
    <Box pt={2} {...rest} className={classNames} disabled>
      {disabled
        ? React.Children.map(children, (child) => {
            return React.cloneElement(child, { disabled: true });
          })
        : children}
    </Box>
  );
};

export default ActionBar;
