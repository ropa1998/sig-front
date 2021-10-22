import {
    Box,
    Button, Checkbox,
    Container,
    FormControl, FormControlLabel,
    Grid, InputLabel,
    LinearProgress, MenuItem, Select,
    Typography,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Formik, Form} from "formik";
import TextFieldContainer from "../../components/TextFieldContainer";
import * as yup from "yup";
import {useHistory} from "react-router-dom";

import {withSnackbar} from "../../components/SnackBarHOC";
import {getActivePallets, getPallets, getPickerData, getScaleData, getUserInfoById} from "../../utils/Server";

const validationSchema = yup.object().shape({
    palletId: yup.string().required().label("palletId"),
    userId: yup.string().required().label("userId"),
    amount: yup.number().required().min(-1000).max(1000).label("amount"),
    isExtraordinary: yup.bool().required().label("isExtraordinary"),
});

const CreateTransaction = (props) => {

        const initialValues = {
            palletId: "",
            userId: "",
            amount: "",
            isExtraordinary: ""
        };

        const {showMessage, submit, subtitle, title} = props;

        const history = useHistory();

        const [pallets, setPallets] = useState([]);
        const [pallet, setPallet] = useState(true);
        const [loading, setLoading] = useState(true);
        const [kilograms, setKilograms] = React.useState("");
        const [user, setUser] = React.useState("");
        const [checked, setChecked] = React.useState(false);

        useEffect(() => {
            getActivePallets()
                .then((res) => {
                    setPallets(res.data)
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
                values["palletId"] = pallet
                values["userId"] = user.id
                values["amount"] = kilograms
                values["isExtraordinary"] = checked
                validationSchema.isValid(values).then(async (valid) => {
                        if (valid) {
                            await submit(values)
                            showMessage("success", "Successfully created transaction");
                            setTimeout(() => {
                                history.push(`/transactions`);
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

        const handlePalletChange = (event) => {
            setPallet(event.target.value);
        };

        const handledCheckedChange = (event) => {
            setChecked(event.target.checked);
        };

        const lookForScaleData = () => {
            getScaleData()
                .then((res) => {
                    setKilograms(res.data["kilograms"])
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
                                                            <InputLabel>Pallet</InputLabel>
                                                            <Select
                                                                id="hop"
                                                                value={pallet}
                                                                label="Pallet"
                                                                onChange={handlePalletChange}
                                                                formikProps={formikProps}
                                                            >
                                                                {pallets.length > 0 &&
                                                                pallets.map((item, index) => {
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
                                                        id="originalKilograms"
                                                        label="Kilograms"
                                                        formikProps={formikProps}
                                                        value={kilograms}
                                                        onChange={(e) => setKilograms(e.target.value)}
                                                        type="number"
                                                        InputProps={{
                                                            inputProps: {
                                                                max: 1000, min: -1000
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControlLabel control={<Checkbox
                                                        checked={checked}
                                                        onChange={handledCheckedChange}
                                                        inputProps={{'aria-label': 'controlled'}}
                                                    />} label="Extraordinary"/>
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
                                                            onClick={lookForScaleData}
                                                        >
                                                            {"READ SCALE"}
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

export default withSnackbar(CreateTransaction);