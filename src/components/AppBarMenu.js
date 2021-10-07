import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import React from "react";
import { AccountCircle } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";

export const AppBarMenu = () => {
  const { isLoggedIn, logOut } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogOut = () => {
    logOut();
    handleClose();
    window.location.replace("/login");
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6">A2</Typography>
            </Grid>
            <Grid item>
              {isLoggedIn && (
                <div>
                  <IconButton onClick={handleMenu} color="inherit">
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <Link href="/profile" color={"inherit"} underline={"none"}>
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                    </Link>
                    <Link
                      href="/my-projects"
                      color={"inherit"}
                      underline={"none"}
                    >
                      <MenuItem onClick={handleClose}>My Projects</MenuItem>
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
