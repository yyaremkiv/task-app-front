import React from "react";
import {
  Box,
  Typography,
  Toolbar,
  Button,
  AppBar,
  Container,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {
  Menu as MenuIcon,
  DarkMode as DarkMode,
  LightMode as LigthMode,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export const Header = ({ mode, setMode }: any) => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.setItem("token", "");
    navigate("/auth");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Task Manager App
            </Typography>
            <Button color="inherit" onClick={logOut}>
              Log out
            </Button>

            <IconButton
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              sx={{ color: "#fff" }}
            >
              {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
