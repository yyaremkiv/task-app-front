import React, { useState } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import DragHandleRoundedIcon from "@mui/icons-material/DragHandleRounded";
import NoteRoundedIcon from "@mui/icons-material/NoteRounded";
import NoteAltRoundedIcon from "@mui/icons-material/NoteAltRounded";
import { BoardItem, CardItem } from "../../interfaces/DataTypes";
import { CustomInput } from "../CustomInput/CustomInput";
import { Card } from "../Card/Card";
import { Dropdown } from "../Dropdown/Dropdown";
import useMediaQuery from "@mui/material/useMediaQuery";
import { deepOrange } from "@mui/material/colors";
import { ItemAddCardBtn, TitleBgBoard } from "../style/styles/styles";

interface BoardProps {
  board: BoardItem;
  addCard: (boardId: number, cardTitle: string) => void;
  removeBoard: (boardId: number) => void;
  removeCard: (boardId: number, cardId: number) => void;
  updateCard: (boardId: number, cardId: number, card: CardItem) => void;
  onDragEnd: (boardId: number, cardId: number) => void;
  onDragEnter: (boardId: number, cardId: number) => void;
}

export const Board: React.FC<BoardProps> = (props: BoardProps) => {
  const {
    board,
    addCard,
    removeBoard,
    removeCard,
    updateCard,
    onDragEnd,
    onDragEnter,
  } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <Box>
      <Box>
        <TitleBgBoard
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="12px"
          flexWrap="wrap"
          sx={{
            padding: "7px 10px",
            borderRadius: "7px 7px 0px 0px ",
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <NoteAltRoundedIcon color="inherit" fontSize="medium" />
            <Typography
              variant="h5"
              gutterBottom
              sx={{ margin: "0" }}
              fontSize="20px"
            >
              {board.title}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="center" alignItems="center">
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
                <TitleBgBoard
                  sx={{ border: "none" }}
                  onClick={() => {
                    removeBoard(board?.id);
                  }}
                >
                  <Button variant="text" color="inherit">
                    Delete Board
                  </Button>
                </TitleBgBoard>
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
          onClickAddBtn={(value: string) => {
            addCard(board.id, value);
          }}
          directionBtn="row"
        />
      </ItemAddCardBtn>
    </Box>
  );
};
