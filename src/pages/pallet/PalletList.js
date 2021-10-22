import React, {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {withSnackbar} from "../../components/SnackBarHOC";
import {getPallets} from "../../utils/Server";

function PalletList(props) {
    const [pallets, setPallets] = useState([]);
    const {showMessage} = props;

    async function fetchPallets() {
        try {
            const response = await getPallets();
            setPallets(response.data);
        } catch (e) {
            showMessage("error", "Opss... Something went wrong");
        }
    }

    useEffect(() => {
        fetchPallets();
    }, [pallets]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="center">Code Bar</TableCell>
                        <TableCell align="center">Hop</TableCell>
                        <TableCell align="center">Expiration Date</TableCell>
                        <TableCell align="center">Original Kilograms</TableCell>
                        <TableCell align="center">Remaining Kilograms</TableCell>
                        <TableCell align="center">Position</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pallets.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.codeBar}</TableCell>
                            <TableCell align="right">{row.hop}</TableCell>
                            <TableCell
                                align="right">{new Date(row.expirationDate).toLocaleDateString('es-AR')}</TableCell>
                            <TableCell align="right">{row.originalKilograms}</TableCell>
                            <TableCell align="right">{row.remainingKilograms}</TableCell>
                            <TableCell align="right">{row.position?.name || "NOT ACTIVE"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default withSnackbar(PalletList);
