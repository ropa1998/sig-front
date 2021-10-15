import React, {useEffect, useState} from "react";
import RackDetail from "../../components/RackDetail";
import {Grid} from "@mui/material";
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

        <Grid container item xs={12} spacing={3}>
            <Grid item xs={12}>
                <Grid
                    container
                    spacing={4}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                >
                    {racks.length > 0 &&
                    racks.map((item, index) => {
                        return (
                            <Grid key={index} item xs={4}>
                                <RackDetail rack={item}/>
                            </Grid>
                        );
                    })}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default withSnackbar(RackList);
