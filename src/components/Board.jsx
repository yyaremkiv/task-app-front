import { useState } from "react";
import { CustomInput } from "./CustomInput";
import { Card } from "./Card";
import { Dropdown } from "./Dropdown";
import { deepOrange } from "@mui/material/colors";
import { CustomAutocomplete } from "./CustomAutocomplete";
import { CustomAutocompleteSingle } from "./CustomAutocompleteSingle";
import { ChangeButtons } from "./ChangeButtons";
import { ItemAddCardBtn, TitleBgBoard } from "./styles";
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Chip,
} from "@mui/material";
import DragHandleRoundedIcon from "@mui/icons-material/DragHandleRounded";
import NoteRoundedIcon from "@mui/icons-material/NoteRounded";
import NoteAltRoundedIcon from "@mui/icons-material/NoteAltRounded";
import useMediaQuery from "@mui/material/useMediaQuery";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PaletteIcon from "@mui/icons-material/Palette";
import DataConfigInformation from "../data/DataConfigInformation";

export const Board = ({
  board,
  handleChangeTitleBoard,
  handleChangeLabelBoard,
  handleChangeColorBoard,
  handleRemoveBoard,
  addCard,
  removeCard,
  updateCard,
}) => {
  const [showTitleChange, setShowTitleChange] = useState(false);
  const [showLabelsChange, setShowLabelsChange] = useState(false);
  const [showColorChange, setShowColorChange] = useState(false);
  const [titleBoard, setTitleBoard] = useState(board.title || "title");
  const [showDropdown, setShowDropdown] = useState(false);
  const [labels, setLabels] = useState(board.labels || []);
  const [color, setColor] = useState(
    DataConfigInformation.colors.find((el) => el.color === board.color)
  );
  const matches = useMediaQuery("(min-width:600px)");

  const handleChangeLabels = (_, labels) => setLabels(labels);
  const handleChangeColor = (_, color) => setColor(color);

  return (
    <Box>
      <Box>
        <TitleBgBoard
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
            padding: "0.25rem 1rem",
            borderRadius: "0.75rem 0.75rem 0 0",
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

                <ChangeButtons
                  valueForSubmit={{ boardId: board.id, titleBoard }}
                  changeFunc={handleChangeTitleBoard}
                  closeFunc={setShowTitleChange}
                />
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
                  onClick={() => handleRemoveBoard({ boardId: board.id })}
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
          {/* Start - labels */}
          {showLabelsChange ? (
            <Box>
              <CustomAutocomplete
                label="Set Labels of Board"
                changeFieldName="labels"
                value={labels}
                changeFieldFunction={handleChangeLabels}
                options={DataConfigInformation.labelCategories}
              />

              <ChangeButtons
                valueForSubmit={{ boardId: board.id, labels }}
                changeFunc={handleChangeLabelBoard}
                closeFunc={setShowLabelsChange}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "4px",
              }}
            >
              {board?.labels.map((item) => (
                <Chip
                  key={item.label}
                  label={item.label}
                  style={{
                    color: "#fff",
                    backgroundColor: item.color,
                  }}
                />
              ))}
            </Box>
          )}
          {/* End - labels */}

          {/* Start - color change */}
          {showColorChange && (
            <Box>
              <CustomAutocompleteSingle
                label="Set Color Of Border"
                changeFieldName="color"
                value={color}
                changeFieldFunction={handleChangeColor}
                options={DataConfigInformation.colors}
              />

              <ChangeButtons
                valueForSubmit={{
                  boardId: board.id,
                  color: color?.color || "",
                }}
                changeFunc={handleChangeColorBoard}
                closeFunc={setShowColorChange}
              />
            </Box>
          )}
          {/* End - color change */}
          {board?.cards?.map((card) => (
            <Card
              card={card}
              key={card.id}
              boardId={board.id}
              removeCard={removeCard}
              updateCard={updateCard}
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
