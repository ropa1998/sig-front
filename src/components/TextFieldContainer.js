import React from "react";

import { TextField } from "@mui/material";

export default function TextFieldContainer(props) {
  const { id, formikProps, helperText } = props;

  return (
    <TextField
      id={id}
      name={id}
      fullWidth
      helperText={formikProps.touched[id] ? formikProps.errors[id] : helperText}
      error={formikProps.touched[id] && Boolean(formikProps.errors[id])}
      value={formikProps.values[id]}
      onChange={formikProps.handleChange}
      variant="filled"
      {...props}
    />
  );
}
