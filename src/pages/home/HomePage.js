import React, {useEffect, useState} from "react";
import RackDetail from "../../components/RackDetail";
import {Grid, Typography} from "@mui/material";
import {withSnackbar} from "../../components/SnackBarHOC";
import Search from "../../components/Search";
import {getUserInfoById} from "../../utils/Server";

function HomePage(props) {

    const {title, showMessage} = props;
    const [user, setUser] = useState(true);

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
    });

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
        </Grid>
    );
}

export default withSnackbar(HomePage);
