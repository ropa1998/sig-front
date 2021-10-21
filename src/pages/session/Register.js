import {Box, Button, Container, Grid, Typography} from "@mui/material";
import React from "react";
import {Formik, Form} from "formik";
import TextFieldContainer from "../../components/TextFieldContainer";
import * as yup from "yup";
import {useHistory} from "react-router-dom";

import {withSnackbar} from "../../components/SnackBarHOC";

const validationSchema = yup.object().shape({
    email: yup.string().email().required().nullable().label("Email"),
    nickname: yup.string().required().nullable().min(3).max(24).label("Nickname"),
    password: yup.string().required().min(8).max(32).label("Password"),
    passwordConfirmation: yup
        .string()
        .required()
        .min(8)
        .max(32)
        .oneOf([yup.ref("password")], "Passwords do not match")
        .label("Password confirmation"),
});

const Register = (props) => {
    const initialValues = {
        email: "",
        nickname: "",
        password: "",
        passwordConfirmation: "",
    };

    return (
        <>
            <ShowForm initialValues={initialValues} {...props} />
        </>
    );
};

const ShowForm = (props) => {
    const {title, subtitle, submit, showMessage, initialValues} = props;
    const history = useHistory();

    const onSubmit = async (values) => {
        try {
            const response = await submit(values);
            showMessage("success", `Successfully created user`);
            setTimeout(() => {
                history.push(`/home`);
            }, 1000);
        } catch (e) {
            showMessage(
                "error",
                typeof e?.response?.data === "string"
                    ? e?.response?.data
                    : "There was an error!"
            );
        }
    };


    return (
        <Container>
            <Box marginTop={6}>
                <Grid container justifyContent="center">
                    <Grid container item xs={6} justify="center" spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4">{title}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography>{subtitle}</Typography>
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
                                                    id="email"
                                                    label="Email"
                                                    formikProps={formikProps}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextFieldContainer
                                                    id="nickname"
                                                    label="Nickname"
                                                    formikProps={formikProps}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextFieldContainer
                                                    id="password"
                                                    label="Password"
                                                    formikProps={formikProps}
                                                    type="password"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextFieldContainer
                                                    id="passwordConfirmation"
                                                    label="Password confirmation"
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
                                                    {"Register"}
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
};

export default withSnackbar(Register);
