import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RemoveDialog(props) {
  const { onRemoveYes, onRemoveNo, data } = props;

  return (
    <div>
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={onRemoveNo}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        onKeyDown={(evn) => evn.key === "Enter" && onRemoveYes()}
      >
        <DialogTitle id="alert-dialog-slide-title">
          <p>Are you sure you want to remove</p>
          <p style={{ textAlign: "center" }}>{`${
            data.name ? data.name + "???" : "all tasks ?"
          }`}</p>
        </DialogTitle>
        <DialogActions>
          <Button onClick={onRemoveNo} variant="outlined" color="primary">
            NO
          </Button>
          <Button
            onClick={() => onRemoveYes(data)}
            variant="outlined"
            color="primary"
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
