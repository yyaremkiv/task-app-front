import { useState } from "react";
import { UserImage } from "./UserImage";
import {
  Box,
  Menu,
  Tooltip,
  Typography,
  useTheme,
  Theme,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { Logout } from "@mui/icons-material/";

interface IAvatarUserProps {
  username: string;
  showMenu: boolean;
  logoutFunc?: () => void;
}

export const AvatarUser = ({
  username,
  showMenu,
  logoutFunc,
}: IAvatarUserProps): JSX.Element => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const theme: Theme = useTheme();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElUser(event.currentTarget);

  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      {showMenu ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography
            sx={{ color: theme.palette.text.light }}
          >{`Hello, ${username}`}</Typography>
          <Tooltip title="Open settings">
            <Box
              onClick={handleOpenUserMenu}
              sx={{
                borderRadius: "50%",
                "&:hover": { cursor: "pointer" },
              }}
            >
              <UserImage size="3rem" />
            </Box>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
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
            <MenuItem
              onClick={() => {
                if (logoutFunc) logoutFunc();
                handleCloseUserMenu();
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <UserImage size="3rem" />
          <Typography
            sx={{ color: theme.palette.text.primary }}
          >{`Hello, ${username}`}</Typography>
        </Box>
      )}
    </Box>
  );
};
