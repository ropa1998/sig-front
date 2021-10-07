import React, { useState } from "react";
import { Avatar, Box, Button, Grid, Menu, MenuItem } from "@mui/material";

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const goToMyAccount = () => {
    window.location.href = "/account";
  };
  return (
    <Grid container direction="row" justifyContent="flex-end">
      <Grid item>
        <Box p={1} pr={2}>
          <Button
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar
              alt="Remy Sharp"
              src="https://miro.medium.com/max/720/1*TLSXdYk_2zXW3BEBMzKdjg.png"
            />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                transform: "translateX(-20px) translateY(0px)",
              },
            }}
          >
            <MenuItem onClick={goToMyAccount}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Navbar;
