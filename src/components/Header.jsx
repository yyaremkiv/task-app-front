import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Toolbar,
  AppBar,
  Container,
  Button,
  IconButton,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Mode } from "./Mode";
import AuthOperations from "../redux/auth/AuthOperations";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDataUser } from "../hooks/useDataUser";

import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { WrapperBurgerMenu } from "./styles";

export const Header = ({ mode, setMode }) => {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const dispatch = useDispatch();
  const matches = useMediaQuery("(max-width:600px)");
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [stateBurger, setStateBurger] = useState({
    left: false,
  });
  const [user, isLoading, error] = useDataUser();

  useEffect(() => {
    if (!matches) {
      setBurgerMenu(false);
    }
  }, [matches]);

  const logOut = () => {
    dispatch(AuthOperations.logout());
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      (event.type === "keydown" && event.key === "Tab") ||
      event.key === "Shift"
    ) {
      return;
    }
    setStateBurger({ ...stateBurger, [anchor]: open });
    setBurgerMenu(!burgerMenu);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            {matches ? (
              <IconButton
                onClick={toggleDrawer("left", true)}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            ) : null}
            {burgerMenu ? (
              <React.Fragment key={"left"}>
                <Drawer
                  anchor="left"
                  open={stateBurger["left"]}
                  onClose={toggleDrawer("left", false)}
                >
                  <WrapperBurgerMenu
                    sx={{ width: 200 }}
                    role="presentation"
                    onClick={toggleDrawer("left", false)}
                    onKeyDown={toggleDrawer("left", false)}
                  >
                    <List>
                      {[
                        <Mode
                          mode={mode}
                          setMode={setMode}
                          matches={matches}
                        />,
                      ].map((el, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemButton>
                            <ListItemText primary={el} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                    <Divider />
                  </WrapperBurgerMenu>
                </Drawer>
              </React.Fragment>
            ) : null}
            <Typography
              variant="h6"
              component="div"
              textAlign={matches ? "center" : "left"}
              sx={{ flexGrow: 1, padding: "10px" }}
            >
              Task Manager App
            </Typography>

            {user && !isLoading && !error && (
              <Typography mr="2rem">Hello , {user.username}</Typography>
            )}

            {isLogged && matches ? (
              ""
            ) : (
              <Box
                onClick={logOut}
                sx={{ display: "flex", alignContent: "center" }}
              >
                <Button color="inherit" startIcon={<LogoutIcon />}>
                  Log out
                </Button>
              </Box>
            )}
            {matches ? (
              ""
            ) : (
              <Mode mode={mode} setMode={setMode} matches={matches} />
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
