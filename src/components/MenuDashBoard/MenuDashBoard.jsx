import { useState } from "react";
import { IconButton, ListItemIcon } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PaletteIcon from "@mui/icons-material/Palette";

export const MenuDashBoard = ({
  boardId,
  showTitleChange,
  setShowTitleChange,
  setShowLabelsChange,
  setShowColorChange,
  handleRemoveBoard,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <IconButton onClick={handleClick} size="large">
        <MenuIcon color="primary" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            setShowTitleChange(!showTitleChange);
            handleClose();
          }}
        >
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          Edit title
        </MenuItem>
        <MenuItem
          onClick={() => {
            setShowLabelsChange(true);
            handleClose();
          }}
        >
          <ListItemIcon>
            <BookmarkBorderIcon />
          </ListItemIcon>
          Edit Labels
        </MenuItem>
        <MenuItem
          onClick={() => {
            setShowColorChange(true);
            handleClose();
          }}
        >
          <ListItemIcon>
            <PaletteIcon />
          </ListItemIcon>
          Edit Color
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleRemoveBoard({ boardId });
            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          Delete Board
        </MenuItem>
      </Menu>
    </div>
  );
};
