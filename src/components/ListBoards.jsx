import { useEffect } from "react";
import { useDispatch } from "react-redux";
import TaskOperations from "../redux/task/taskOperations";
import { Box, Grid } from "@mui/material";
import { GridItem } from "./GridItem";
import { Board } from "./Board";
import BoardHandler from "../helpers/boardHandler.js";

export const ListBoards = ({ boards, page, limit, isLoading }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(TaskOperations.getBoards({ params: { page, limit } }));
  }, [dispatch, page, limit]);

  const handleAddCardToBoard = ({ boardId, titleCard }) => {
    const newBoard = new BoardHandler(boards);
    const updatedBoard = newBoard.addCard({ boardId, titleCard });

    dispatch(TaskOperations.updateBoard({ boardId, board: updatedBoard }));
  };

  const handleRemoveCard = ({ boardId, cardId }) => {
    const newBoard = new BoardHandler(boards);
    const updatedBoard = newBoard.removeCard({ boardId, cardId });

    dispatch(TaskOperations.updateBoard({ boardId, board: updatedBoard }));
  };

  const handelUpdateCard = ({ boardId, cardId, updatedCard }) => {
    const newBoard = new BoardHandler(boards);
    const updatedBoard = newBoard.updateCard({ boardId, cardId, updatedCard });

    dispatch(TaskOperations.updateBoard({ boardId, board: updatedBoard }));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box>
        <Grid container spacing={2}>
          {boards?.map((board) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={board.id}>
              <GridItem
                sx={{
                  border: `2px solid ${board.color || "gray"}`,
                }}
              >
                <Board
                  board={board}
                  addCard={handleAddCardToBoard}
                  removeCard={handleRemoveCard}
                  updateCard={handelUpdateCard}
                />
              </GridItem>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
