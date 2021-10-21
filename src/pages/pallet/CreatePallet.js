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
import {getAvailableResources, getPickerData, getUserInfoById} from "../../utils/Server";

const validationSchema = yup.object().shape({
    codeBar: yup.string().required().min(3).max(24).label("codeBar"),
    positionId: yup.string().required().min(3).label("positionId"),
    hop: yup.string().required().min(3).label("hop"),
    originalKilograms: yup.number().required().min(1).max(1000).label("originalKilograms"),
});

const CreatePallet = (props) => {

        const initialValues = {
            positionId: "",
            codeBar: "",
            hop: "",
            expirationDate: "",
            originalKilograms: "",
            assistingPeripherals: ""
        };

        const {showMessage, submit, subtitle, title} = props;

        const history = useHistory();

        const [hops, setHops] = useState(true);
        const [hop, setHop] = useState(true);
        const [positions, setPositions] = useState(true);
        const [position, setPosition] = useState("");
        const [loading, setLoading] = useState(true);
        const [user, setUser] = useState(true);
        const [date, setDate] = React.useState(new Date());
        const [codeBar, setCodeBar] = React.useState("");
        const [kilograms, setKilograms] = React.useState("");

        useEffect(() => {
            getAvailableResources()
                .then((res) => {
                    setPositions(res.data["positions"])
                    setHops(res.data["hops"])
                    setLoading(false);
                })
                .catch((e) => {
                    showMessage("error", e.response?.data?.errors || "An error ocurred");
                });
            getUserInfoById()
                .then((res) => {
                    setUser(res.data)
                })
                .catch((e) => {
                    showMessage("error", e.response?.data?.errors || "An error ocurred");
                });
        }, [setLoading]);


        const onSubmit = async () => {
            try {
                let values = {}
                values["expirationDate"] = date
                values["positionId"] = position
                values["hop"] = hop
                values["assistingPeripherals"] = []
                values["originalKilograms"] = kilograms
                values["codeBar"] = codeBar
                values["userId"] = user["id"]
                validationSchema.isValid(values).then(async (valid) => {
                        if (valid) {
                            await submit(values);
                            showMessage("success", "Succesfully created pallet");
                            setTimeout(() => {
                                history.push(`/racks`);
                            }, 1000);
                        } else {
                            showMessage("error", "Your input data is not valid. Please check it");
                        }
                    }
                )
            } catch (e) {
                showMessage("error", e.response?.data || "An error ocurred");
            }
        };

        const handleHopChange = (event) => {
            setHop(event.target.value);
        };

        const handlePositionChange = (event) => {
            setPosition(event.target.value);
        };

        const handleDateChange = (newValue) => {
            setDate(newValue);
        };

        const lookForPickerDate = () => {
            getPickerData()
                .then((res) => {
                    setHop(res.data["hop"])
                    setDate(res.data["expirationDate"])
                    setKilograms(res.data["originalKilograms"])
                    setCodeBar(res.data["codeBar"])
                })
                .catch((e) => {
                    showMessage("error", e.response?.data?.errors || "An error ocurred");
                });
        }

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
                                >
                                    {(formikProps) => (
                                        <Form onSubmit={formikProps.handleSubmit}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <Box sx={{minWidth: 120}}>
                                                        <FormControl fullWidth>
                                                            <InputLabel>Position</InputLabel>
                                                            <Select
                                                                id="positionId"
                                                                value={position}
                                                                label="Position"
                                                                onChange={handlePositionChange}
                                                            >
                                                                {positions.length > 0 &&
                                                                positions.map((item, index) => {
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
                                                        id="codeBar"
                                                        label="Code Bar"
                                                        formikProps={formikProps}
                                                        value={codeBar}
                                                        onChange={(e) => setCodeBar(e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Box sx={{minWidth: 120}}>
                                                        <FormControl fullWidth>
                                                            <InputLabel>Hop Type</InputLabel>
                                                            <Select
                                                                id="hop"
                                                                value={hop}
                                                                label="Hop Type"
                                                                onChange={handleHopChange}
                                                                formikProps={formikProps}
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
                                                                    id="expirationDate"
                                                                    label="Date desktop"
                                                                    inputFormat="dd/MM/yyyy"
                                                                    formikProps={formikProps}
                                                                    value={date}
                                                                    onChange={handleDateChange}
                                                                    renderInput={(params) => <TextField {...params} />}
                                                                    minDate={new Date()}
                                                                />
                                                            </LocalizationProvider>
                                                        </FormControl>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextFieldContainer
                                                        id="originalKilograms"
                                                        label="Kilograms"
                                                        formikProps={formikProps}
                                                        value={kilograms}
                                                        onChange={(e) => setKilograms(e.target.value)}
                                                        type="number"
                                                        InputProps={{
                                                            inputProps: {
                                                                max: 1000, min: 1
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
                                                            onClick={onSubmit}
                                                        >
                                                            {"CREATE"}
                                                        </Button>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            type="submit"
                                                            onClick={lookForPickerDate}
                                                        >
                                                            {"READ PICKER"}
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
    }
;

export default withSnackbar(CreatePallet);
