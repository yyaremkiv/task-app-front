import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Autocomplete,
  Chip,
} from "@mui/material";
import DragHandleRoundedIcon from "@mui/icons-material/DragHandleRounded";
import NoteRoundedIcon from "@mui/icons-material/NoteRounded";
import NoteAltRoundedIcon from "@mui/icons-material/NoteAltRounded";
import { CustomInput } from "./CustomInput";
import { Card } from "./Card";
import { Dropdown } from "./Dropdown";
import useMediaQuery from "@mui/material/useMediaQuery";
import { deepOrange } from "@mui/material/colors";
import { ItemAddCardBtn, TitleBgBoard } from "./styles";

import TaskOperations from "../redux/task/taskOperations";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import BoardHandler from "../helpers/boardHandler.js";
import { Chipp } from "./Chipp";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PaletteIcon from "@mui/icons-material/Palette";

import DataConfigInformation from "../data/DataConfigInformation";
import { CustomAutocomplete } from "./CustomAutocomplete";

export const Board = ({
  board,
  addCard,
  removeCard,
  updateCard,
  onDragEnd,
  onDragEnter,
}) => {
  const [showTitleChange, setShowTitleChange] = useState(false);
  const [showLabelsChange, setShowLabelsChange] = useState(false);
  const [showColorChange, setShowColorChange] = useState(false);

  const [titleBoard, setTitleBoard] = useState(board.title || "title");
  const [showDropdown, setShowDropdown] = useState(false);
  const matches = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();

  const [labels, setLabels] = useState(board.labels || []);
  const [color, setColor] = useState(
    DataConfigInformation.colors.find((el) => el.color === board.color)
  );

  const handleRemoveBoard = (boardId) => {
    dispatch(TaskOperations.removeBoard({ boardId }));
  };

  const handleChangeTitle = () => {
    const newBoard = new BoardHandler([board]);

    const updatedBoard = newBoard.updateTitleBoard({
      boardId: board.id,
      titleBoard,
    });
    dispatch(
      TaskOperations.updateBoard({ boardId: board.id, board: updatedBoard })
    );
    setShowTitleChange(false);
  };

  const handleChangeLable = () => {
    const newBoard = new BoardHandler([board]);

    const updatedBoard = newBoard.updateLabeleBoard({
      boardId: board.id,
      labels,
    });
    dispatch(
      TaskOperations.updateBoard({ boardId: board.id, board: updatedBoard })
    );
    setShowLabelsChange(false);
  };

  const handleChangeColor = () => {
    const newBoard = new BoardHandler([board]);

    const updatedBoard = newBoard.updateColorBoard({
      boardId: board.id,
      color: color?.color || "",
    });
    dispatch(
      TaskOperations.updateBoard({ boardId: board.id, board: updatedBoard })
    );
    setShowColorChange(false);
  };

  return (
    <Box>
      <Box>
        <TitleBgBoard
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "12px",
            padding: "7px 10px",
            borderRadius: "7px 7px 0px 0px ",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <NoteAltRoundedIcon color="inherit" fontSize="medium" />

            {showTitleChange ? (
              <Box
                sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <TextField
                  size="small"
                  label="Title"
                  multiline
                  value={titleBoard}
                  onChange={(e) => setTitleBoard(e.target.value)}
                />
                <IconButton onClick={handleChangeTitle}>
                  <DoneIcon />
                </IconButton>
                <IconButton onClick={() => setShowTitleChange(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            ) : (
              <Typography
                variant="h5"
                gutterBottom
                sx={{ margin: "0" }}
                fontSize="20px"
              >
                {board.title}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                padding: "6px",
                borderRadius: "5px",
                margin: "0",
              }}
            >
              {board?.cards?.length || 0}
            </Typography>
            <NoteRoundedIcon color="inherit" fontSize="medium" />
          </Box>
          <Box sx={{ zIndex: 5, position: "relative" }}>
            <IconButton
              size="large"
              color="inherit"
              aria-label="menu"
              onClick={() => {
                setShowDropdown(!showDropdown);
              }}
            >
              <DragHandleRoundedIcon fontSize="inherit" />
            </IconButton>

            {showDropdown && (
              <Dropdown onClose={() => setShowDropdown(false)}>
                <Button
                  startIcon={<EditIcon />}
                  onClick={() => {
                    setShowDropdown(false);
                    setShowTitleChange(!showTitleChange);
                  }}
                  style={{ whiteSpace: "nowrap", justifyContent: "flex-start" }}
                >
                  Edit title
                </Button>
                <Button
                  startIcon={<BookmarkBorderIcon />}
                  onClick={() => {
                    setShowDropdown(false);
                    setShowLabelsChange(true);
                  }}
                  style={{ whiteSpace: "nowrap", justifyContent: "flex-start" }}
                >
                  Edit Labels
                </Button>
                <Button
                  startIcon={<PaletteIcon />}
                  onClick={() => {
                    setShowDropdown(false);
                    setShowColorChange(true);
                  }}
                  style={{ whiteSpace: "nowrap", justifyContent: "flex-start" }}
                >
                  Edit Color
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  onClick={() => handleRemoveBoard(board.id)}
                  style={{ whiteSpace: "nowrap", justifyContent: "flex-start" }}
                >
                  Delete Board
                </Button>
              </Dropdown>
            )}
          </Box>
        </TitleBgBoard>
        <Box
          sx={{
            padding: "7px",
            marginBottom: "12px",
            maxHeight: "450px",
            overflow: "hidden",
            overflowY: matches ? "none" : "scroll",
            "&:hover": { overflowY: "scroll" },
            "&::-webkit-scrollbar": {
              width: "7px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: deepOrange["A400"],
              borderRadius: "5px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: deepOrange["100"],
            },
          }}
        >
          {/* Start change labels */}
          <Box sx={{ border: "1px solid gray" }}>
            {showLabelsChange ? (
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
              >
                <Autocomplete
                  id="size-small-outlined-multi"
                  multiple
                  fullWidth
                  isOptionEqualToValue={(option, value) =>
                    option.label === value.label && option.color === value.color
                  }
                  options={DataConfigInformation.labelCategories}
                  getOptionLabel={(option) => option.label}
                  value={labels}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Set Label"
                      placeholder="Add more"
                    />
                  )}
                  onChange={(_, values) => {
                    setLabels(values);
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={index}
                        label={option.label}
                        style={{
                          color: "white",
                          backgroundColor: option.color,
                          marginRight: "5px",
                        }}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <IconButton onClick={handleChangeLable}>
                    <DoneIcon />
                  </IconButton>
                  <IconButton onClick={() => setShowLabelsChange(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "start",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "3px",
                }}
              >
                {board?.labels?.map((item) => (
                  <Chip
                    key={item.label}
                    label={item.label}
                    style={{
                      color: "white",
                      backgroundColor: item.color,
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
          {/* Start color changer */}
          <Box>
            {showColorChange ? (
              <Box>
                <Autocomplete
                  fullWidth
                  disablePortal
                  id="combo-box-demo"
                  value={color}
                  options={DataConfigInformation.colors}
                  getOptionLabel={(option) => option.label}
                  onChange={(_, selectedValues) => {
                    setColor(selectedValues);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Set Color Of Border" />
                  )}
                  renderOption={(props, option) => (
                    <Box
                      {...props}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <Box
                        sx={{
                          width: "2rem",
                          height: "1rem",
                          backgroundColor: option.color,
                        }}
                      ></Box>
                      <Typography>{option.label}</Typography>
                    </Box>
                  )}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <IconButton onClick={handleChangeColor}>
                    <DoneIcon />
                  </IconButton>
                  <IconButton onClick={() => setShowColorChange(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
            ) : null}
          </Box>
          {/* End color changer */}
          {board?.cards?.map((card) => (
            <Card
              card={card}
              key={card.id}
              boardId={board.id}
              removeCard={removeCard}
              updateCard={updateCard}
              onDragEnd={onDragEnd}
              onDragEnter={onDragEnter}
            />
          ))}
        </Box>
      </Box>
      <ItemAddCardBtn>
        <CustomInput
          text="Add Card"
          placeholder="Enter Card Title"
          onClickAddBtn={(value) =>
            addCard({ boardId: board.id, titleCard: value })
          }
          directionBtn="row"
        />
      </ItemAddCardBtn>
    </Box>
  );
};
