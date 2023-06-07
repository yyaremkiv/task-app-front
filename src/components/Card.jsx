import React, { useState } from "react";
import { CardInfo } from "./CardInfo";
import { Dropdown } from "./Dropdown";
import {
  Box,
  Paper,
  Stack,
  Typography,
  IconButton,
  Button,
  Chip,
} from "@mui/material";
import {
  PlaylistAddCheck as PlaylistAddCheckSharp,
  NoteRounded as NoteRoundedIcon,
  DragHandleRounded as DragHandleRoundedIcon,
  CalendarMonthOutlined as CalendarMonthOutlinedIcon,
} from "@mui/icons-material";
import { TitleBgCard } from "./styles";

export const Card = ({ card, boardId, removeCard, updateCard }) => {
  const { id, title, date, tasks, labels, desc } = card;
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCardInfo, setShowCardInfo] = useState(false);

  return (
    <Paper
      elevation={4}
      sx={{
        padding: "20px",
        marginBottom: "10px",
        cursor: "pointer",
      }}
    >
      {showCardInfo && (
        <CardInfo
          card={card}
          boardId={boardId}
          onCLose={() => {
            setShowCardInfo(false);
          }}
          updateCard={updateCard}
        />
      )}

      <Stack
        key={card.id}
        draggable
        onClick={() => {
          setShowCardInfo(true);
        }}
        direction="column"
        spacing={2}
        justifyContent="space-between"
        alignItems="start"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            flexWrap: "wrap",
            gap: "3px",
          }}
        >
          {labels?.map((item, index) => (
            <Chip
              key={index}
              label={item.label}
              style={{
                color: "white",
                backgroundColor: item.color,
              }}
            />
          ))}
        </Box>

        <TitleBgCard
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "3px",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={1}
            sx={{
              padding: "2px 6px",
            }}
          >
            <NoteRoundedIcon color="inherit" fontSize="small" />
            <Typography variant="h6" gutterBottom margin="0" fontSize="16px">
              {title}
            </Typography>
          </Box>

          <Box
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown(true);
            }}
            sx={{ position: "relative" }}
          >
            <IconButton aria-label="menu" color="inherit">
              <DragHandleRoundedIcon fontSize="inherit" />
            </IconButton>
            {showDropdown && (
              <Dropdown
                onClose={() => {
                  setShowDropdown(false);
                }}
              >
                <TitleBgCard
                  onClick={() => removeCard({ boardId, cardId: id })}
                  sx={{ border: "none" }}
                >
                  <Button variant="text" color="inherit">
                    Delete
                  </Button>
                </TitleBgCard>
              </Dropdown>
            )}
          </Box>
        </TitleBgCard>

        <Box
          display="flex"
          gap={1}
          sx={{
            borderBottom: "1px solid #009688",
          }}
        >
          {date ? (
            <CalendarMonthOutlinedIcon color="primary" fontSize="small" />
          ) : null}
          <Typography variant="subtitle2" gutterBottom margin="0">
            {date}
          </Typography>
        </Box>

        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ textAlign: "justify", color: "grey.500" }}
        >
          {desc || "Click on this card for setting"}
        </Typography>

        <Box display="flex" gap="10px" justifyContent="center" width="100%">
          <PlaylistAddCheckSharp color="primary" fontSize="medium" />
          {tasks && tasks?.length > 0 ? (
            <Typography variant="subtitle1" gutterBottom color="primary">
              {`${tasks?.filter((el) => el.completed)?.length}/${
                tasks?.length
              } tasks`}
            </Typography>
          ) : (
            <Typography
              variant="subtitle1"
              gutterBottom
              color="primary"
            >{`${tasks?.length} tasks`}</Typography>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};
