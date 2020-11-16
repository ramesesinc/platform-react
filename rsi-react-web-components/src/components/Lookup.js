import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import _object from "lodash/object";
import produce from "immer";

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
  onSelect,
  query,
  setQuery,
  searchFieldTitle,
  searchField,
  hideSearchText=false,
  enableSelect=true,
  ...rest
}) => {

  if (!visibleWhen) return null;

  const classes = useStyles();
  const [searchText, setSearchText] = useState();
  const [open, setOpen] = useState(false);

  const openLookupPage = () => {
    if (searchField) {
      const updatedQuery =  _object.set(query, searchField, searchText );
      setQuery(updatedQuery);
    }
    setOpen(true);
  }

  const onCancel = () => {
    setOpen(false);
  }

  const onAccept = () => {
    setOpen(false);
    onSelect();
  }

  const handleChange = (evt) => {
    setSearchText(evt.target.value);
  }

  return (
    <React.Fragment>
    {hideSearchText ? (
      <IconButton onClick={openLookupPage}>
        <SearchIcon />
      </IconButton>
    )
      : (
        <TextField
          className={classes.margin}
          label={caption}
          value={searchText}
          onChange={handleChange}
          variant="outlined"
          size="small"
          helperText={searchFieldTitle}
          autoFocus={true}
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
    )}

      <Dialog open={open}>
        <DialogTitle>{caption}</DialogTitle>
        <DialogContent>
          {children}
          <ActionBar>
            <Button variant="text" caption="Cancel" onClick={onCancel} />
            <Button caption="Select" onClick={onAccept} disableWhen={!enableSelect}/>
          </ActionBar>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default Lookup;
