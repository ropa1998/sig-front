import {
    Box,
    Button,
    Container,
    FormControl,
    Grid, InputLabel,
    LinearProgress, MenuItem, Select, TextField,
    Typography,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Formik, Form} from "formik";
import TextFieldContainer from "../../components/TextFieldContainer";
import * as yup from "yup";
import {useHistory} from "react-router-dom";

import {withSnackbar} from "../../components/SnackBarHOC";
import {LocalizationProvider} from "@mui/lab";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {getAvailableResources, getUserInfoById} from "../../utils/Server";
import RackDetail from "../../components/RackDetail";

const validationSchema = yup.object().shape({
    name: yup.string().required().nullable().min(3).max(24).label("rackId"),
    x: yup.number().min(1).max(10).label("x"),
    y: yup.number().min(1).max(10).label("y"),
    z: yup.number().min(1).max(10).label("z"),
});

const CreatePallet = (props) => {

    const initialValues = {
        rackId: "",
        x: "",
        y: "",
        z: "",
        codeBar: "",
        hop: "",
        expirationDate: "",
        kilograms: "",
        assistingPeripherals: ""
    };

    const {showMessage, submit, subtitle, title} = props;

    const history = useHistory();

    const [hops, setHops] = useState(true);
    const [hop, setHop] = useState(true);
    const [racks, setRacks] = useState(true);
    const [rack, setRack] = useState(true);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getAvailableResources()
            .then((res) => {
                setRacks(res.data["racks"])
                setHops(res.data["hops"])
                setLoading(false);
            })
            .catch((e) => {
                showMessage("error", e.response?.data?.errors || "An error ocurred");
            });
    }, [setLoading]);


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

    const handleHopChange = (event) => {
        setHop(event.target.value);
    };

    const handleRackChange = (event) => {
        setRack(event.target.value);
    };

    const [value, setValue] = React.useState(new Date());

    const handleOtherChange = (newValue) => {
        setValue(newValue);
    };

    if (loading) return <LinearProgress/>;
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
                                                <Box sx={{minWidth: 120}}>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Rack</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={rack}
                                                            label="Rack"
                                                            onChange={handleRackChange}
                                                        >
                                                            {racks.length > 0 &&
                                                            racks.map((item, index) => {
                                                                return (
                                                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                                                );
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextFieldContainer
                                                    id="x"
                                                    label="X Length"
                                                    formikProps={formikProps}
                                                    type="number"
                                                    InputProps={{
                                                        inputProps: {
                                                            max: 100, min: 1
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
                                                            max: 100, min: 1
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
                                                            max: 100, min: 1
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextFieldContainer
                                                    id="codeBar"
                                                    label="Code Bar"
                                                    formikProps={formikProps}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box sx={{minWidth: 120}}>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Hop Type</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={hop}
                                                            label="Hop Type"
                                                            onChange={handleHopChange}
                                                        >
                                                            {hops.length > 0 &&
                                                            hops.map((item, index) => {
                                                                return (
                                                                    <MenuItem value={item}>{item}</MenuItem>
                                                                );
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box sx={{minWidth: 120}}>
                                                    <FormControl fullWidth>
                                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                            <DesktopDatePicker
                                                                label="Date desktop"
                                                                inputFormat="dd/MM/yyyy"
                                                                value={value}
                                                                onChange={handleOtherChange}
                                                                renderInput={(params) => <TextField {...params} />}
                                                                minDate={new Date()}
                                                            />
                                                        </LocalizationProvider>
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextFieldContainer
                                                    id="kilograms"
                                                    label="Kilograms"
                                                    formikProps={formikProps}
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

export default withSnackbar(CreatePallet);
