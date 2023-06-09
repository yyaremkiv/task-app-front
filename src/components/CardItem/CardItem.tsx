import React, { useState } from "react";
import { ListItemIcon } from "@mui/material";
import { PlaylistAddCheckSharp, NoteRounded } from "@mui/icons-material";
import { Box, Paper, Stack, Typography, IconButton, Chip } from "@mui/material";
import { ILabel } from "../../Interfaces/DataTypes";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

type HandleOpenFunction = (params: { boardId: string; card: any }) => void;
type HandleRemoveCardFunction = (params: {
  boardId: string;
  cardId: string;
}) => void;

interface ICardItemProp {
  card: any;
  boardId: string;
  removeCard: HandleRemoveCardFunction;
  handleOpen: HandleOpenFunction;
}

export const CardItem: React.FC<ICardItemProp> = ({
  card,
  boardId,
  removeCard,
  handleOpen,
}) => {
  const { id, title, dateStart, dateEnd, tasks, labels, desc } = card;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Paper
      elevation={4}
      sx={{
        padding: "0.5rem",
        cursor: "pointer",
      }}
    >
      <Stack
        onClick={() => {
          handleOpen({ boardId, card });
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.25rem",
            padding: "0.45rem 0",
          }}
        >
          {labels?.map((item: ILabel, index: number) => (
            <Chip
              key={index}
              label={item.label}
              style={{ color: "white", backgroundColor: item.color }}
            />
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.25rem 0.5rem",
            color: "#009688",
            backgroundColor: "#00606425",
            borderBottom: "2px solid #006064",
            borderRadius: "0.25rem 0.25rem 0 0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <NoteRounded color="inherit" fontSize="small" />
            <Typography variant="h6" sx={{ margin: 0, fontSize: "1rem" }}>
              {title}
            </Typography>
          </Box>

          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{ position: "relative" }}
          >
            <Box>
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
                    removeCard({ boardId, cardId: id });
                    handleClose();
                  }}
                >
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  Delete
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            padding: "0.5rem 0",
          }}
        >
          {dateStart && (
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CalendarTodayIcon />
              <Typography>
                Date start:{" "}
                {new Date(dateStart)
                  .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                  .replace(/\//g, ".")}
              </Typography>
            </Box>
          )}

          {dateEnd && (
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <EventAvailableIcon />
              <Typography>
                Date end:{" "}
                {new Date(dateEnd)
                  .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                  .replace(/\//g, ".")}
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ padding: "0.5rem" }}>
          <Typography
            variant="subtitle2"
            sx={{ textAlign: "justify", color: "grey.500" }}
          >
            {desc || "Click on this card for setting"}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            paddding: "0.5rem 0",
          }}
        >
          <PlaylistAddCheckSharp color="primary" fontSize="medium" />
          {tasks?.length > 0 ? (
            <Typography variant="subtitle1" color="primary">
              {`${tasks?.filter((el: any) => el.completed)?.length}/${
                tasks?.length
              } tasks`}
            </Typography>
          ) : (
            <Typography
              variant="subtitle1"
              color="primary"
            >{`${tasks?.length} tasks`}</Typography>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};
