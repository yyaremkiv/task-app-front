import { Fragment } from "react";
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
  useTheme,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Menu as MenuIcon } from "@mui/icons-material";
import AuthOperations from "../../redux/auth/AuthOperations";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDataUser } from "../../hooks/useDataUser";
import { Drawer, List, Divider } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { setModeTheme } from "../../redux/theme/themeSlice";
import { UserImage } from "../UserImage";
import { AvatarUser } from "../AvatarUser";

export const Header = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const dispatch = useDispatch();

  const matches = useMediaQuery("(max-width:600px)");
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [stateBurger, setStateBurger] = useState({
    left: false,
  });
  const [user, isLoading, error] = useDataUser();
  const { palette } = useTheme();

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
              <Fragment key={"left"}>
                <Drawer
                  anchor="left"
                  open={stateBurger["left"]}
                  onClose={toggleDrawer("left", false)}
                >
                  <Box
                    sx={{ width: 200 }}
                    role="presentation"
                    onClick={toggleDrawer("left", false)}
                    onKeyDown={toggleDrawer("left", false)}
                  >
                    <List>
                      <IconButton
                        onClick={() => dispatch(setModeTheme())}
                        sx={{ fontSize: "25px" }}
                      >
                        {palette.mode === "dark" ? (
                          <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (
                          <LightMode
                            sx={{ color: "white", fontSize: "25px" }}
                          />
                        )}
                      </IconButton>
                    </List>
                    <Divider />
                  </Box>
                </Drawer>
              </Fragment>
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
              <AvatarUser username={user.username} />
              // <Typography mr="2rem">Hello , {user.username}</Typography>
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
              <IconButton
                onClick={() => dispatch(setModeTheme())}
                sx={{ fontSize: "25px" }}
              >
                {palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: "white", fontSize: "25px" }} />
                )}
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
