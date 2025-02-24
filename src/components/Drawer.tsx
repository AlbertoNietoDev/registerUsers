import { Menu, Stack, IconButton, MenuItem, ListItemIcon } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

export const Drawer: React.FC = () => {
  const navigate = useNavigate();

  const auth = useSelector((state: any) => state.AuthReducer);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/auth");
  };

  // console.log("AUTH: ", auth);

  return (
    <Stack
      sx={{
        minHeight: "5rem",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        color: "#fafafa",
        width: "100%",
        p: 2,
      }}
    >
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <IconButton
        edge="start"
        sx={{
          height: "30px",
          width: "30px",
          "&:focus": {
            outline: "none !important",
          },
        }}
        color="inherit"
        aria-label="menu"
        onClick={handleClick}
      >
        <KeyboardArrowDownIcon color="primary" />
      </IconButton>
      {auth?.items?.email}
    </Stack>
  );
};
