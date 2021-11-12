import React, {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {withSnackbar} from "../../components/SnackBarHOC";
import {downloadTransactionsCSV, getRacks, getTransactions} from "../../utils/Server";
import {Button, Checkbox, Grid} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";

function TransactionList(props) {
    const [transactions, setTransactions] = useState([]);
    const {showMessage} = props;

    async function fetchTransactions() {
        try {
            const response = await getTransactions();
            setTransactions(response.data);
        } catch (e) {
            showMessage("error", "Opss... Something went wrong");
        }
    }

    const downloadTransactions = async () => {
        try {
            const response = await downloadTransactionsCSV();
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'transactions.csv'); //or any other extension
            document.body.appendChild(link);
            link.click();
            showMessage("success", "Successfully downloaded transaction CSV");
        } catch (e) {
            showMessage("error", e.response?.data || "An error ocurred");
        }
    };

    useEffect(() => {
        fetchTransactions(); //Delete the comments to get all projects when mount the page
    }, [setTransactions]);

    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    const columns = [
        {
            field: 'date',
            headerName: 'Date',
            flex: 1,
            valueGetter: (params) => {
                return new Date(params.value).toLocaleDateString('es-AR')
            }
        },
        {
            field: 'user',
            headerName: 'User',
            flex: 1,
            valueGetter: (params) => {
                return params.value.nickname
            }
        },
        {field: 'user', headerName: 'User', flex: 1, type: 'number',},
        {field: 'amount', headerName: 'Amount (kg)', flex: 1},
        {field: 'isExtraordinary', headerName: 'Is Extraordinary', flex: 1},
        {
            field: 'assistedBy',
            headerName: 'Assisting Peripherals',
            flex: 1,
            valueGetter: (params) => {
                console.log(params)
                console.log(params.value)
                return params.value === "" ? "NO ASSISTANCE" : params.value
            }
        },
    ];

    return (
        <div>
            {/*<TableContainer component={Paper}>*/}
            {/*    <Table sx={{minWidth: 650}} aria-label="simple table">*/}
            {/*        <TableHead>*/}
            {/*            <TableRow>*/}
            {/*                <TableCell>Pallet</TableCell>*/}
            {/*                <TableCell align="center">Date</TableCell>*/}
            {/*                <TableCell align="center">User</TableCell>*/}
            {/*                <TableCell align="center">Amount (kg)</TableCell>*/}
            {/*                <TableCell align="center">Is Extraordinary</TableCell>*/}
            {/*                <TableCell align="center">Assisting Peripherals</TableCell>*/}
            {/*            </TableRow>*/}
            {/*        </TableHead>*/}
            {/*        <TableBody>*/}
            {/*            {transactions.map((row) => (*/}
            {/*                <TableRow*/}
            {/*                    key={row.name}*/}
            {/*                    sx={{'&:last-child td, &:last-child th': {border: 0}}}*/}
            {/*                >*/}
            {/*                    <TableCell component="th" scope="row">*/}
            {/*                        {row.pallet.name}*/}
            {/*                    </TableCell>*/}
            {/*                    <TableCell align="center">{new Date(row.date).toLocaleString("es-AR")}</TableCell>*/}
            {/*                    <TableCell align="center">{row.user.nickname}</TableCell>*/}
            {/*                    <TableCell align="center">{row.amount}</TableCell>*/}
            {/*                    <TableCell align="center">*/}
            {/*                        <Checkbox checked={row.isExtraordinary} disabled={true}/>*/}
            {/*                    </TableCell>*/}
            {/*                    <TableCell*/}
            {/*                        align="center">{row.assistedBy === "" ? "NO ASSISTANCE" : row.assistedBy}</TableCell>*/}
            {/*                </TableRow>*/}
            {/*            ))}*/}
            {/*        </TableBody>*/}
            {/*    </Table>*/}
            {/*</TableContainer>*/}
            <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={downloadTransactions}
            >
                {"DOWNLOAD TRANSACTIONS"}
            </Button>
            <div style={{height: 400, width: '100%'}}>
                <DataGrid
                    rows={transactions}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                />
            </div>
        </div>
    );
}

export default withSnackbar(TransactionList);
