import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    LinearProgress,
    Typography,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Formik, Form} from "formik";
import TextFieldContainer from "../../components/TextFieldContainer";
import * as yup from "yup";
import {useHistory} from "react-router-dom";

import {withSnackbar} from "../../components/SnackBarHOC";

const validationSchema = yup.object().shape({
    name: yup.string().required().nullable().min(3).max(24).label("Name"),
    x: yup.number().min(1).max(10).label("x"),
    y: yup.number().min(1).max(10).label("y"),
    z: yup.number().min(1).max(10).label("z"),
});

const CreateRack = (props) => {

    const initialValues = {
        name: "",
        x: "",
        y: "",
        z: "",
    };

    const {showMessage, submit, subtitle, title} = props;

    const history = useHistory();

    const onSubmit = async (values) => {
        try {
            await submit(values);
            showMessage("success", "Succesfully created rack");
            setTimeout(() => {
                history.push(`/racks`);
            }, 1000);
        } catch (e) {
            showMessage("error", e.response?.data || "An error ocurred");
        }
    };

    return (
        <Container>
            <Box marginTop={6}>
                <Grid container justifyContent="center">
                    <Grid container item xs={6} justifyContent="center" spacing={2}>
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
                                                    id="name"
                                                    label="Rack Name"
                                                    formikProps={formikProps}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextFieldContainer
                                                    id="x"
                                                    label="X Length"
                                                    formikProps={formikProps}
                                                    type="number"
                                                    InputProps={{
                                                        inputProps: {
                                                            max: 10, min: 1
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextFieldContainer
                                                    id="y"
                                                    label="Y Length"
                                                    formikProps={formikProps}
                                                    type="number"
                                                    InputProps={{
                                                        inputProps: {
                                                            max: 10, min: 1
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextFieldContainer
                                                    id="z"
                                                    label="Z Length"
                                                    formikProps={formikProps}
                                                    type="number"
                                                    InputProps={{
                                                        inputProps: {
                                                            max: 10, min: 1
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid
                                                container
                                                item
                                                xs={12}
                                                justifyContent={"space-between"}
                                            >
                                                <Grid item>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        type="submit"
                                                    >
                                                        {"CREATE"}
                                                    </Button>
                                                </Grid>
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

export default withSnackbar(CreateRack);
