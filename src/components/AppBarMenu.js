import {
    AppBar,
    Box, Divider,
    Grid,
    IconButton,
    Link,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";

import React from "react";
import {AccountCircle, List} from "@mui/icons-material";
import {useAuth} from "../contexts/AuthContext";

export const AppBarMenu = () => {
    const {isLoggedIn, logOut, isAdmin} = useAuth();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElUtility, setAnchorElUtility] = React.useState(null);

    const handleLogOut = () => {
        logOut();
        handleCloseUserMenu();
        handleCloseUtilityMenu();
        window.location.replace("/login");
    };
    const handleUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleUtilityMenu = (event) => {
        setAnchorElUtility(event.currentTarget);
    };

    const handleCloseUtilityMenu = () => {
        setAnchorElUtility(null);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Link href="/home" color={"inherit"} underline={"none"}>
                            <Typography variant="h6">Quilmes SIG</Typography>
                        </Link>
                        <Grid item>
                            {isLoggedIn && (
                                <div>
                                    <IconButton onClick={handleUtilityMenu} color="inherit">
                                        <List/>
                                    </IconButton>
                                    <Menu
                                        id="utility-appbar"
                                        anchorEl={anchorElUtility}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        open={Boolean(anchorElUtility)}
                                        onClose={handleCloseUtilityMenu}
                                    >
                                        <Link href="/add-pallet" color={"inherit"} underline={"none"}>
                                            <MenuItem onClick={handleCloseUserMenu}>Add Pallet</MenuItem>
                                        </Link>
                                        <Link href="/pallets" color={"inherit"} underline={"none"}>
                                            <MenuItem onClick={handleCloseUserMenu}>Pallet List</MenuItem>
                                        </Link>
                                        <Divider/>
                                        <Link href="/add-transaction" color={"inherit"} underline={"none"}>
                                            <MenuItem onClick={handleCloseUserMenu}>Create Transaction</MenuItem>
                                        </Link>
                                        <Link href="/transactions" color={"inherit"} underline={"none"}>
                                            <MenuItem onClick={handleCloseUserMenu}>Transaction List</MenuItem>
                                        </Link>
                                        <Divider/>
                                        <Link href="/add-rack" color={"inherit"} underline={"none"}>
                                            <MenuItem onClick={handleCloseUserMenu}>Add Rack</MenuItem>
                                        </Link>
                                        <Link href="/racks" color={"inherit"} underline={"none"}>
                                            <MenuItem onClick={handleCloseUserMenu}>Rack List</MenuItem>
                                        </Link>
                                        <Divider/>
                                        <Link href="/add-user" color={"inherit"} underline={"none"}>
                                            <MenuItem onClick={handleCloseUserMenu}>Add User</MenuItem>
                                        </Link>
                                    </Menu>
                                    <IconButton onClick={handleUserMenu} color="inherit">
                                        <AccountCircle/>
                                    </IconButton>
                                    <Menu
                                        id="user-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <Link href="/profile" color={"inherit"} underline={"none"}>
                                            <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                                        </Link>
                                        <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                                    </Menu>
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
