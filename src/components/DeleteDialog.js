import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { withSnackbar } from "./SnackBarHOC";
import { deleteProjectById } from "../utils/Server";
// eslint-disable-next-line no-undef

const DeleteDialog = (props) => {
  const { open, setOpen, showMessage, id } = props;

  const handleClose = () => {
    setOpen(!open);
  };

  const handleDelete = async () => {
    try {
      await deleteProjectById(id);

      showMessage("success", "Successfully deleted the project");
      setOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (e) {
      showMessage("error", "Failed to delete project");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete project"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Deleting a project is permanent and will remove all content including
          comments, avatars and profile settings. Are you sure you want to
          delete this project?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withSnackbar(DeleteDialog);
