import React, {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {withSnackbar} from "../../components/SnackBarHOC";
import {downloadPalletsCSV, getPallets} from "../../utils/Server";
import {Button, Grid} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';

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

    const downloadPallets = async () => {
        try {
            const response = await downloadPalletsCSV();
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'pallets.csv'); //or any other extension
            document.body.appendChild(link);
            link.click();
            showMessage("success", "Successfully downloaded pallet CSV");
        } catch (e) {
            showMessage("error", e.response?.data || "An error ocurred");
        }
    };

    useEffect(() => {
        fetchPallets();
    }, [setPallets]);

    const columns = [
        {field: 'id', headerName: 'ID', flex: 1},
        {field: 'codeBar', headerName: 'Barcode', flex: 1, type: 'number',},
        {field: 'hop', headerName: 'Hop', flex: 1},
        {field: 'originalKilograms', headerName: 'Original Kilograms', flex: 1, type: 'number',},
        {field: 'remainingKilograms', headerName: 'Remaining Kilograms', flex: 1, type: 'number',},
        {
            field: 'expirationDate',
            headerName: 'Full name',
            flex: 1,
            valueGetter: (params) => {
                return new Date(params.value).toLocaleDateString('es-AR')
            }
        },
        {
            field: 'position',
            headerName: 'Full name',
            flex: 1,
            valueGetter: (params) =>
            {
                return params.value.name || "NOT ACTIVE"
            }
        },
        {
            field: 'assistingPeripherals',
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
            <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={downloadPallets}
            >
                {"DOWNLOAD PALLETS"}
            </Button>
            <div style={{height: 400, width: '100%'}}>
                <DataGrid
                    rows={pallets}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                />
            </div>
            {/*<TableContainer component={Paper} width={"max-content"}>*/}
            {/*    <Table sx={{minWidth: 650}} aria-label="simple table">*/}
            {/*        <TableHead>*/}
            {/*            <TableRow>*/}
            {/*                <TableCell>ID</TableCell>*/}
            {/*                <TableCell align="center">Barcode</TableCell>*/}
            {/*                <TableCell align="center">Hop</TableCell>*/}
            {/*                <TableCell align="center">Expiration Date</TableCell>*/}
            {/*                <TableCell align="center">Original Kilograms</TableCell>*/}
            {/*                <TableCell align="center">Remaining Kilograms</TableCell>*/}
            {/*                <TableCell align="center">Position</TableCell>*/}
            {/*                <TableCell align="center">Assisting Peripherals</TableCell>*/}
            {/*            </TableRow>*/}
            {/*        </TableHead>*/}
            {/*        <TableBody>*/}
            {/*            {pallets.map((row) => (*/}
            {/*                <TableRow*/}
            {/*                    key={row.id}*/}
            {/*                    sx={{'&:last-child td, &:last-child th': {border: 0}}}*/}
            {/*                >*/}
            {/*                    <TableCell component="th" scope="row">*/}
            {/*                        {row.id}*/}
            {/*                    </TableCell>*/}
            {/*                    <TableCell align="center">{row.codeBar}</TableCell>*/}
            {/*                    <TableCell align="center">{row.hop}</TableCell>*/}
            {/*                    <TableCell*/}
            {/*                        align="center">{new Date(row.expirationDate).toLocaleDateString('es-AR')}</TableCell>*/}
            {/*                    <TableCell align="center">{row.originalKilograms}</TableCell>*/}
            {/*                    <TableCell align="center">{row.remainingKilograms}</TableCell>*/}
            {/*                    <TableCell align="center">{row.position?.name || "NOT ACTIVE"}</TableCell>*/}
            {/*                    <TableCell*/}
            {/*                        align="center">{row.assistingPeripherals === "" ? "NO ASSISTANCE" : row.assistingPeripherals}</TableCell>*/}
            {/*                </TableRow>*/}
            {/*            ))}*/}
            {/*        </TableBody>*/}
            {/*    </Table>*/}
            {/*</TableContainer>*/}
        </div>
    );
}

export default withSnackbar(PalletList);
