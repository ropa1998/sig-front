import React, {useEffect, useState} from "react";
import RackDetail from "../../components/RackDetail";
import {Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {withSnackbar} from "../../components/SnackBarHOC";
import {downloadTransactionsCSV, getCriticalValues, getExistences, getUserInfoById} from "../../utils/Server";
import {useHistory} from "react-router-dom";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    // codeBar: yup.string().required().min(3).max(24).label("codeBar"),
    id: yup.string().required().min(3).label("id"),
    limit: yup.number().required().min(1).max(1000).label("limit"),
});

function DownloadCSV(props) {


    const {title, showMessage, submit} = props;

    const [loading, setLoading] = useState(true);
    const [criticalValues, setCriticalValues] = useState([]);
    const [criticalValue, setCriticalValue] = useState([]);
    const [kilograms, setKilograms] = useState(0);

    const history = useHistory();

    const downloadTransactions = async () => {
        try {
            await downloadTransactionsCSV();
            showMessage("success", "Succesfully created pallet");
        } catch (e) {
            showMessage("error", e.response?.data || "An error ocurred");
        }
    };

    const downloadPallets = async () => {
        try {
            await downloadTransactionsCSV();
            showMessage("success", "Succesfully created pallet");
        } catch (e) {
            showMessage("error", e.response?.data || "An error ocurred");
        }
    };

    return (
        <Grid
            container columnSpacing={{xs: 1, sm: 2, md: 3}}
        >
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={downloadTransactions}
                >
                    {"DOWNLOAD TRANSACTIONS"}
                </Button>
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={downloadPallets}
                >
                    {"DOWNLOAD PALLETS"}
                </Button>
            </Grid>
        </Grid>
    );
}

export default withSnackbar(DownloadCSV);
