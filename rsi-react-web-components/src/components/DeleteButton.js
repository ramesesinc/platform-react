import React from "react";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteButton = ({
  action,
  visibleWhen = true,
  disableWhen = false,
  iconSize = "small",
  ...rest
}) => {
  if (!visibleWhen) return null;

  return (
    <IconButton
      onClick={action}
      color="secondary"
      aria-label="delete"
      disabled={disableWhen}
      {...rest}
    >
      <DeleteIcon fontSize={iconSize} />
    </IconButton>
  );
};

export default DeleteButton;
