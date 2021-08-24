import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialog(props) {
  const { onEditSave, onEditClose, data } = props;
  const [tempValue, setTempValue] = useState(data?.name || "");
  const onTxtChange = (evn) => {
    setTempValue(evn.target.value);
  };
  const onEnterEdit = (evn) => evn.keyCode === 13 && onEditSave(tempValue);
  return (
    <div>
      <Dialog
        open={true}
        onClose={onEditClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            value={tempValue}
            onChange={onTxtChange}
            onKeyDown={onEnterEdit}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={onEditClose}>
            CANCEL
          </Button>
          <Button
            onClick={() => onEditSave(tempValue)}
            variant="outlined"
            color="primary"
          >
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
