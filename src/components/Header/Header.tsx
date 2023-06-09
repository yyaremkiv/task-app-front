import { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AvatarUser } from "../AvatarUser";
import { useDataUser } from "../../hooks/useDataUser";
import { setModeTheme } from "../../redux/theme/themeSlice";
import { RootState, AppDispatch } from "../../redux/store";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Drawer, List, Divider } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import {
  Box,
  Typography,
  Container,
  IconButton,
  useTheme,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import AuthOperations from "../../redux/auth/AuthOperations";

export const Header: React.FC = () => {
  const [state, setState] = useState({ left: false });
  const isLogged = useSelector((state: RootState) => state.auth.isLogged);
  const [user] = useDataUser();
  const isNonMobileScreens = useMediaQuery("(max-width:600px)");
  const dispatch: AppDispatch = useDispatch();
  const { palette } = useTheme();
  const theme = useTheme();

  const logOut = () => dispatch(AuthOperations.logout());

  const toggleDrawer =
    (anchor: keyof typeof state, open: boolean) =>
    (e: React.KeyboardEvent | React.MouseEvent) => {
      if (
        e.type === "keydown" &&
        ((e as React.KeyboardEvent).key === "Tab" ||
          (e as React.KeyboardEvent).key === "Shift")
      )
        return;
      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: keyof typeof state) => (
    <Box
      sx={{ width: 250 }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {isLogged && (
        <>
          <ListItem
            disablePadding
            sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}
          >
            <AvatarUser username={user.username} showMenu={false} />
          </ListItem>
          <Divider />
          <List>
            <ListItem disablePadding onClick={logOut}>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </>
      )}
      <List>
        <ListItem disablePadding onClick={() => dispatch(setModeTheme())}>
          <ListItemButton>
            <ListItemIcon>
              {palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ fontSize: "25px" }} />
              )}
            </ListItemIcon>
            <ListItemText primary={"Change Mode"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      sx={{ padding: "1rem 0", backgroundColor: theme.palette.background.main }}
    >
      <Container sx={{ maxWidth: "xl" }}>
        {isNonMobileScreens ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              onClick={toggleDrawer("left", true)}
              sx={{ color: "white" }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.light,
              }}
            >
              Task Manager App
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.light,
              }}
            >
              Task Manager App
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              <IconButton onClick={() => dispatch(setModeTheme())}>
                {palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: "white", fontSize: "25px" }} />
                )}
              </IconButton>

              {user.username && isLogged && (
                <AvatarUser
                  username={user.username}
                  showMenu={true}
                  logoutFunc={logOut}
                />
              )}
            </Box>
          </Box>
        )}
      </Container>

      <Box>
        <Fragment key={"left"}>
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </Fragment>
      </Box>
    </Box>
  );
};
