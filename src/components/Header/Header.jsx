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
import { AvatarUser } from "../AvatarUser";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export const Header = () => {
  const [state, setState] = useState({ left: false });
  const [user, isLogged] = useDataUser();
  const isNonMobileScreens = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const theme = useTheme();

  const logOut = () => dispatch(AuthOperations.logout());

  const toggleDrawer = (anchor, open) => (e) => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) return;
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Inbox"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={"All mail"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      sx={{ padding: "1rem 0", backgroundColor: theme.palette.background.main }}
    >
      <Container maxWidth="xl">
        {isNonMobileScreens ? (
          <IconButton
            onClick={toggleDrawer("left", true)}
            sx={{ color: "white" }}
          >
            <MenuIcon />
          </IconButton>
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
              {user.username && <AvatarUser username={user.username} />}

              {isLogged ? (
                <Button
                  color="inherit"
                  startIcon={<LogoutIcon />}
                  onClick={logOut}
                >
                  Log out
                </Button>
              ) : null}

              <IconButton onClick={() => dispatch(setModeTheme())}>
                {palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: "white", fontSize: "25px" }} />
                )}
              </IconButton>
            </Box>
          </Box>
        )}

        {/* <Toolbar> */}
        {/* {matches ? (
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
          ) : null} */}
        {/* {burgerMenu ? (
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
                        <LightMode sx={{ color: "white", fontSize: "25px" }} />
                      )}
                    </IconButton>
                  </List>
                  <Divider />
                </Box>
              </Drawer>
            </Fragment>
          ) : null} */}

        {/* <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              padding: "10px",
              color: palette.text.light,
            }}
          >
            Task Manager App
          </Typography> */}

        {/* <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              padding: "0.5rem 0",
            }}
          > */}
        {/* {user && !isLoading && <AvatarUser username={user.username} />} */}

        {/* {isLogged && matches ? null : (
              <Button
                color="inherit"
                startIcon={<LogoutIcon />}
                onClick={logOut}
              >
                Log out
              </Button>
            )} */}
        {/*


        {/* </Box> */}
        {/* </Toolbar> */}
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

// <Box>
//   <AppBar position="static">
//     <Container maxWidth="xl">
//       <Toolbar>
//         {matches ? (
//           <IconButton
//             onClick={toggleDrawer("left", true)}
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//         ) : null}
//         {burgerMenu ? (
//           <Fragment key={"left"}>
//             <Drawer
//               anchor="left"
//               open={stateBurger["left"]}
//               onClose={toggleDrawer("left", false)}
//             >
//               <Box
//                 sx={{ width: 200 }}
//                 role="presentation"
//                 onClick={toggleDrawer("left", false)}
//                 onKeyDown={toggleDrawer("left", false)}
//               >
//                 <List>
//                   <IconButton
//                     onClick={() => dispatch(setModeTheme())}
//                     sx={{ fontSize: "25px" }}
//                   >
//                     {palette.mode === "dark" ? (
//                       <DarkMode sx={{ fontSize: "25px" }} />
//                     ) : (
//                       <LightMode
//                         sx={{ color: "white", fontSize: "25px" }}
//                       />
//                     )}
//                   </IconButton>
//                 </List>
//                 <Divider />
//               </Box>
//             </Drawer>
//           </Fragment>
//         ) : null}

//         <Typography
//           variant="h6"
//           sx={{
//             flexGrow: 1,
//             padding: "10px",
//             color: palette.text.light,
//           }}
//         >
//           Task Manager App
//         </Typography>

//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: "2rem",
//             padding: "0.5rem 0",
//           }}
//         >
//           {user && !isLoading && <AvatarUser username={user.username} />}

//           {isLogged && matches ? null : (
//             <Button
//               color="inherit"
//               startIcon={<LogoutIcon />}
//               onClick={logOut}
//             >
//               Log out
//             </Button>
//           )}

//           {matches ? null : (
//             <IconButton onClick={() => dispatch(setModeTheme())}>
//               {palette.mode === "dark" ? (
//                 <DarkMode sx={{ fontSize: "25px" }} />
//               ) : (
//                 <LightMode sx={{ color: "white", fontSize: "25px" }} />
//               )}
//             </IconButton>
//           )}
//         </Box>
//       </Toolbar>
//     </Container>
//   </AppBar>
// </Box>;
