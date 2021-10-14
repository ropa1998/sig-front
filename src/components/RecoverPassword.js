import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Grid, Button, Typography, Container, Box } from "@mui/material";
import TextFieldContainer from "./TextFieldContainer";
import { withSnackbar } from "./SnackBarHOC";
import { useParams } from "react-router-dom";
import { recoverPassword } from "../utils/Server";
import { useHistory } from "react-router-dom";
function RecoverPassword(props) {
  let { token } = useParams();
  let { user } = useParams();
  const history = useHistory();

  const { showMessage } = props;

  const initialValues = {
    newPassword: "",
    repeatPassword: "",
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password should be of minimum 8 characters length")
      .max(31, "Password must be less than 32 characters length")
      .oneOf([Yup.ref("repeatPassword")], "Passwords do not match"),

    repeatPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password should be of minimum 8 characters length")
      .max(31, "Password must be less than 32 characters length")
      .oneOf([Yup.ref("newPassword")], "Passwords do not match"),
  });

  const onSubmit = async (formData) => {
    try {
      await recoverPassword({
        id: user,
        passwordRecoveryToken: token,
        ...formData,
      });
      showMessage("success", "Successfully updated the password");
      setTimeout(() => {
        history.push(`/login`);
      }, 1000);
    } catch (e) {
      showMessage("error", "An error occured");
    }
  };

  return (
    <Container>
      <Box marginTop={4}>
        <Grid container justifyContent="center">
          <Grid
            container
            item
            xs={6}
            spacing={1}
            alignContent="center"
            alignItems="rigth"
          >
            <Grid item xs={12}>
              <Typography variant="h5">Forgot Password</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">
                Please enter your new password
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formikProps) => (
                  <Form onSubmit={formikProps.handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextFieldContainer
                          id="newPassword"
                          label="Password"
                          formikProps={formikProps}
                          type="password"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextFieldContainer
                          id="repeatPassword"
                          label="Repeat Password"
                          formikProps={formikProps}
                          type="password"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          RECOVER
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default withSnackbar(RecoverPassword);
