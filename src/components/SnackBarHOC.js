import React, { useState } from "react";
import { Snackbar, Slide } from "@mui/material";
import { Alert } from "@mui/material";

export const withSnackbar = (WrappedComponent) => {
  return (props) => {
    const [alert, setAlert] = useState({
      open: false,
      message: "An error ocurred",
      severity: "error",
    });

    const showMessage = (severity = "success", message) =>
      setAlert({ ...alert, message: message, severity: severity, open: true });

    const handleClose = (_, reason) =>
      !(reason === "clickaway") && setAlert({ ...alert, open: false });

    return (
      <>
        <WrappedComponent {...props} showMessage={showMessage} />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={2000}
          open={alert.open}
          onClose={handleClose}
          TransitionComponent={Slide}
        >
          <Alert
            variant="filled"
            onClose={handleClose}
            severity={alert.severity}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </>
    );
  };
};
