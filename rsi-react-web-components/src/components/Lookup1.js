import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import ActionBar from "./ActionBar";
import Button from "./Button";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

const Lookup = ({
  caption,
  visibleWhen = true,
  editable = true,
  readOnly = false,
  containerStyle,
  children,
  onOpen,
  ...rest
}) => {

  if (!visibleWhen) return null;

  const classes = useStyles();
  const [searchText, setSearchText] = useState();
  const [open, setOpen] = useState(false);

  const openLookupPage = () => {
    onOpen(searchText);
  }

  return (
      <TextField
        className={classes.margin}
        label={caption}
        value={searchText}
        onChange={(evt) => setSearchText(evt.target.value)}
        variant="outlined"
        size="small"
        {...rest}
        InputProps={{
          readOnly: readOnly || !editable,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={openLookupPage}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
  );
};

export default Lookup;
