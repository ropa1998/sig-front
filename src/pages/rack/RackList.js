import React, {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {withSnackbar} from "../../components/SnackBarHOC";
import {getRacks} from "../../utils/Server";

function RackList(props) {
    const [racks, setRacks] = useState([]);
    const {showMessage} = props;

    async function fetchRacks() {
        try {
            const response = await getRacks();
            setRacks(response.data);
        } catch (e) {
            showMessage("error", "Opss... Something went wrong");
        }
    }

    useEffect(() => {
        fetchRacks(); //Delete the comments to get all projects when mount the page
    }, [racks]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">X</TableCell>
                        <TableCell align="right">Y</TableCell>
                        <TableCell align="right">Z</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {racks.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.x}</TableCell>
                            <TableCell align="right">{row.y}</TableCell>
                            <TableCell align="right">{row.z}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default withSnackbar(RackList);
