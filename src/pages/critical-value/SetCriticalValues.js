import React, {useEffect, useState} from "react";
import RackDetail from "../../components/RackDetail";
import {Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {withSnackbar} from "../../components/SnackBarHOC";
import {getAvailableResources, getCriticalValues, getExistences, getUserInfoById} from "../../utils/Server";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TextFieldContainer from "../../components/TextFieldContainer";
import {useHistory} from "react-router-dom";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    // codeBar: yup.string().required().min(3).max(24).label("codeBar"),
    id: yup.string().required().min(3).label("id"),
    limit: yup.number().required().min(1).max(1000).label("limit"),
});

function SetCriticalValues(props) {


    const {title, showMessage, submit} = props;

    const [loading, setLoading] = useState(true);
    const [criticalValues, setCriticalValues] = useState([]);
    const [criticalValue, setCriticalValue] = useState([]);
    const [kilograms, setKilograms] = useState(0);

    const history = useHistory();

    useEffect(() => {
        getCriticalValues()
            .then((res) => {
                setCriticalValues(res.data)
                setLoading(false);
            })
            .catch((e) => {
                showMessage("error", e.response?.data?.errors || "An error ocurred");
            });
    }, [setLoading]);

    const onSubmit = async () => {
        try {
            let values = {}
            values["id"] = criticalValue.uuid
            values["limit"] = kilograms
            validationSchema.isValid(values).then(async (valid) => {
                if (valid) {
                    await submit(values);
                    showMessage("success", "Succesfully created pallet");
                    setTimeout(() => {
                        history.push(`/pallets`);
                    }, 1000);
                } else {
                    showMessage("error", "Your input data is not valid. Please check it");
                }
            })
        } catch (e) {
            showMessage("error", e.response?.data || "An error ocurred");
        }
    };

    const handleCriticalValueChange = (event) => {
        setCriticalValue(event.target.value);
        setKilograms(event.target.value.minLimit)
    };

    return (
        <Grid container item xs={12} spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4">{title}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Box>
                    <FormControl fullWidth>
                        <InputLabel>Hop Type</InputLabel>
                        <Select
                            id="positionId"
                            value={criticalValue}
                            label="Hop Type"
                            onChange={handleCriticalValueChange}
                        >
                            {criticalValues.length > 0 &&
                            criticalValues.map((item, index) => {
                                return (
                                    <MenuItem value={item}>{item.hopType}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="originalKilograms"
                    label="Critical value (kg)"
                    value={kilograms}
                    onChange={(e) => setKilograms(parseFloat(e.target.value))}
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
                        {"UPDATE"}
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default withSnackbar(SetCriticalValues);
