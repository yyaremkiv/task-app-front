import { useState } from "react";
import { CardItem } from "../CardItem/CardItem";
import { deepOrange } from "@mui/material/colors";
import { CustomAutocomplete } from "../CustomAutocomplete";
import { CustomAutocompleteSingle } from "../CustomAutocompleteSingle";
import { ChangeButtons } from "../ChangeButtons";
import { MenuDashBoard } from "../MenuDashBoard/MenuDashBoard";
import { FormAddCard } from "../FormAddCard/FormAddCard";
import { ILabelsArray, IColorSingle } from "src/interfaces/DataTypes";
import { useTheme, Theme } from "@mui/material/styles";
import {
  Box,
  Typography,
  TextField,
  Chip,
  Paper,
  Divider,
} from "@mui/material";
import NoteRoundedIcon from "@mui/icons-material/NoteRounded";
import NoteAltRoundedIcon from "@mui/icons-material/NoteAltRounded";
import useMediaQuery from "@mui/material/useMediaQuery";
import DataConfigInformation from "../../data/DataConfigInformation";

interface IBoardItemProp {
  board: any;
  handleChangeTitleBoard: (data: {
    boardId: string;
    titleBoard: string;
  }) => void;
  handleChangeLabelBoard: (value: any) => void;
  handleChangeColorBoard: (value: any) => void;
  handleRemoveBoard: (params: { boardId: string }) => void;
  addCard: (data: { boardId: string; titleCard: string }) => void;
  removeCard: (data: { boardId: string; cardId: string }) => void;
  handleOpen: (data: { boardId: string; card: any }) => void;
  isLoading?: boolean;
}

export const BoardItem: React.FC<IBoardItemProp> = ({
  board,
  handleChangeTitleBoard,
  handleChangeLabelBoard,
  handleChangeColorBoard,
  handleRemoveBoard,
  addCard,
  removeCard,
  handleOpen,
  isLoading = false,
}) => {
  const [showTitleChange, setShowTitleChange] = useState<boolean>(false);
  const [showLabelsChange, setShowLabelsChange] = useState<boolean>(false);
  const [showColorChange, setShowColorChange] = useState<boolean>(false);
  const [titleBoard, setTitleBoard] = useState<string>(board.title || "title");
  const [labels, setLabels] = useState(board.labels || []);
  const [color, setColor] = useState<IColorSingle | undefined>(
    DataConfigInformation.colors.find((el: any) => el.color === board.color)
  );
  const matches = useMediaQuery("(min-width:600px)");
  const theme: Theme = useTheme();

  const handleChangeLabels = (_: any, labels: ILabelsArray): void =>
    setLabels(labels);

  const handleChangeColor = (_: any, color: IColorSingle): void =>
    setColor(color);

  return (
    <Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.25rem 1rem",
            color: theme.palette.text.primary,
            backgroundColor: "#00606425",
            borderBottom: "2px solid #006064",
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
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
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
                  isLoading={isLoading}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                <Typography variant="h5" fontSize="1.25rem">
                  {board.title}
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <Typography variant="h6">
                    {board?.cards?.length || 0}
                  </Typography>
                  <NoteRoundedIcon color="inherit" fontSize="medium" />
                </Box>
              </Box>
            )}
          </Box>

          <MenuDashBoard
            boardId={board.id}
            showTitleChange={showTitleChange}
            setShowTitleChange={setShowTitleChange}
            setShowLabelsChange={setShowLabelsChange}
            setShowColorChange={setShowColorChange}
            handleRemoveBoard={handleRemoveBoard}
          />
        </Box>
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
          {showLabelsChange ? (
            <Box sx={{ padding: "0.5rem 0" }}>
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
                gap: "0.25rem",
                paddingBottom: "0.5rem",
              }}
            >
              {board?.labels?.map((item: any) => (
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

          {showColorChange && (
            <Box sx={{ padding: "0.5rem 0" }}>
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

          <Box
            sx={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {board?.cards?.map((card: any) => (
              <CardItem
                key={card.id}
                card={card}
                boardId={board.id}
                removeCard={removeCard}
                handleOpen={handleOpen}
              />
            ))}
          </Box>
        </Box>
      </Box>

      <Paper
        sx={{
          textAlign: "center",
          borderRadius: "0 0 0.5rem 0.5rem",
          backgroundColor: theme.palette.background.light,
        }}
      >
        <Divider />
        <FormAddCard
          boardId={board.id}
          handleAddCard={addCard}
          isLoading={isLoading}
        />
      </Paper>
    </Box>
  );
};
