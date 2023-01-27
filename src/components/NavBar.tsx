import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Popover,
} from "@mui/material";
import { SettingsRounded, AccountCircle } from "@mui/icons-material";
import LogoSVG from "../assets/RedTechLogo.svg";
import { useState } from "react";
const NavBar = () => {
  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setShow(true);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              alt="Red Technologies Logo"
              src={LogoSVG}
              sx={{ height: 50, width: 60, left: 0 }}
            ></Box>
            <Typography>Home</Typography>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" color="inherit">
              <SettingsRounded />
            </IconButton>
            <IconButton size="large" color="inherit" onClick={handleClick}>
              <AccountCircle />
            </IconButton>
          </Box>
          <Popover
            open={show}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            anchorEl={anchorEl}
            sx={{ mt: 2 }}
            onClose={() => {
              setShow(false);
            }}
          >
            <Typography sx={{ p: 2 }}>Log Out</Typography>
          </Popover>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
