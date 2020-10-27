import React from "react";
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

const PlayButton = ({
  action,
  visibleWhen = true,
  disableWhen = false,
  iconSize = "small",
  color="green",
  ...rest
}) => {
  if (!visibleWhen) return null;

  return (
    <IconButton
      onClick={action}
      aria-label="play button"
      disabled={disableWhen}
      {...rest}
    >
      <PlayCircleFilledWhiteIcon fontSize={iconSize} htmlColor={color} />
    </IconButton>
  );
};

export default PlayButton;
