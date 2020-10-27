import React from "react";
import IconButton from '@material-ui/core/IconButton';
import ViewIcon from '@material-ui/icons/ViewModule';

const PreviewButton = ({
  action,
  visibleWhen = true,
  disableWhen = false,
  ...rest
}) => {
  if (!visibleWhen) return null;

  return (
    <IconButton
      onClick={action}
      color="primary"
      aria-label="edit"
      disabled={disableWhen}
      {...rest}
    >
      <ViewIcon />
    </IconButton>
  );
};

export default PreviewButton;
