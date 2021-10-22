import React, {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {withSnackbar} from "../../components/SnackBarHOC";
import {getRacks, getTransactions} from "../../utils/Server";
import {Checkbox} from "@mui/material";

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

    useEffect(() => {
        fetchTransactions(); //Delete the comments to get all projects when mount the page
    }, [transactions]);

    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Pallet</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">User</TableCell>
                        <TableCell align="center">Amount</TableCell>
                        <TableCell align="center">Is Extraordinary</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.pallet.name}
                            </TableCell>
                            <TableCell align="center">{new Date(row.date).toLocaleString("es-AR")}</TableCell>
                            <TableCell align="center">{row.user.nickname}</TableCell>
                            <TableCell align="center">{row.amount}</TableCell>
                            <TableCell align="center">
                                <Checkbox checked={row.isExtraordinary} disabled={true}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default withSnackbar(TransactionList);
