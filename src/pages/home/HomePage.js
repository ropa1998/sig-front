import React, {useEffect, useState} from "react";
import RackDetail from "../../components/RackDetail";
import {Grid, Typography} from "@mui/material";
import {withSnackbar} from "../../components/SnackBarHOC";
import {getExistences, getKPIs, getOrders, getUserInfoById} from "../../utils/Server";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Chart} from "react-google-charts";
import {Card, CardContent} from "@material-ui/core";

function HomePage(props) {

    const {title, showMessage} = props;
    const [user, setUser] = useState(true);
    const [existences, setExistences] = useState([])
    const [orders, setOrders] = useState([])
    const [kpis, setKpis] = useState([])
    const [loading, setLoading] = useState(true);

    const initialValues = {
        email: "",
        nickname: ""
    };

    useEffect(() => {
        getUserInfoById()
            .then((res) => {
                setUser(res.data);
            })
            .catch((e) => {
                showMessage("error", e.response?.data?.errors || "An error ocurred");
            });
        getExistences()
            .then((res) => {
                setExistences(res.data);
            })
            .catch((e) => {
                showMessage("error", e.response?.data?.errors || "An error ocurred");
            });
        getOrders()
            .then((res) => {
                setOrders(res.data);
            })
            .catch((e) => {
                showMessage("error", e.response?.data?.errors || "An error ocurred");
            });
        getKPIs()
            .then((res) => {
                setKpis(res.data);
            })
            .catch((e) => {
                showMessage("error", e.response?.data?.errors || "An error ocurred");
            });
    }, [setLoading]);

    if (user) {
        Object.keys(initialValues).forEach(
            (key) => (initialValues[key] = user[key])
        );
    }

    const subtitle = initialValues.nickname ? `Welcome ${initialValues.nickname}!` : "Welcome!";

    return (
        <Grid container item xs={12} spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4">{title}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>{subtitle}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5">{"KPIs"}</Typography>
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                <Grid item xs={6}>
                    <Card sx={{minWidth: 500, minHeight: 300}}>
                        <CardContent sx={{minWidth: 500, minHeight: 300}}>
                            <Typography sx={{fontSize: 15}} color="text.primary" gutterBottom>
                                Average permanency of stock
                            </Typography>
                            <Typography sx={{fontSize: 180}} color="text.primary">
                                {kpis.permanency + " days"}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{minWidth: 500, minHeight: 300}}>
                        <CardContent>
                            <Chart
                                width={'500px'}
                                height={'300px'}
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['Status', 'Amount'],
                                    ['Picked', kpis.picking],
                                    ['Not Picked', 1 - kpis.picking],
                                ]}
                                options={{
                                    title: 'Receipt Quality',
                                }}
                                rootProps={{'data-testid': '1'}}
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{minWidth: 500, minHeight: 300}}>
                        <CardContent>
                            <Chart
                                width={'500px'}
                                height={'300px'}
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['Quality', 'Amount'],
                                    ['Rotten', kpis.stockQuality],
                                    ['Not Rotten', 1 - kpis.stockQuality],
                                ]}
                                options={{
                                    title: 'Stock Quality',
                                }}
                                rootProps={{'data-testid': '1'}}
                            />
                        </CardContent>
                    </Card>

                </Grid>
                <Grid item xs={6}>
                    <Card sx={{minWidth: 500, minHeight: 300}}>
                        <CardContent>
                            <Chart
                                width={'500px'}
                                height={'300px'}
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['Status', 'Amount'],
                                    ['Picked', kpis.picking],
                                    ['Not Picked', 1 - kpis.picking],
                                ]}
                                options={{
                                    title: 'Receipt Quality',
                                }}
                                rootProps={{'data-testid': '1'}}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5">{"Stock"}</Typography>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper} width={"max-content"}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Barcode</TableCell>
                                <TableCell align="center">Current Amount</TableCell>
                                <TableCell align="center">Critical Value</TableCell>
                                <TableCell align="center">Positions</TableCell>
                                <TableCell align="center">Date when critical value would be hit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {existences.map((row) => (
                                <TableRow
                                    key={row.hop}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.hop}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {row.remainingKilograms}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {row.criticalValue}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {row.positions.join(" - ")}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {row.limitDate ? new Date(row.limitDate).toLocaleString("es-AR") : "NONE"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5">{"Orders"}</Typography>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper} width={"max-content"}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Required Hop</TableCell>
                                <TableCell align="center">Amount (kg)</TableCell>
                                <TableCell align="center">Positions to look for</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((row) => (
                                <TableRow
                                    key={row.orderId}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.orderId}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {new Date(row.date).toLocaleString("es-AR")}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {row.hop}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {row.amount}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {row.lookIn?.join(" - ")}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

export default withSnackbar(HomePage);
