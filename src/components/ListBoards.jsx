import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskOperations from "../redux/task/taskOperations";
import { Grid } from "@mui/material";
import { GridItem } from "./GridItem";
import { Board } from "./Board";
import BoardHandler from "../helpers/BoardHandler";

export const ListBoards = () => {
  const boards = useSelector((state) => state.task.data);
  const isLoading = useSelector((state) => state.task.isLoading);
  const error = useSelector((state) => state.task.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(TaskOperations.getBoards());
  }, [dispatch]);

  const handleAddCardToBoard = ({ boardId, titleCard }) => {
    const newBoard = new BoardHandler(boards);
    newBoard.addCard({ boardId, titleCard });

    return null;
  };

  return (
    <Grid container spacing={2}>
      {boards.map((board) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={board.id}>
          <GridItem>
            <Board
              board={board}
              addCard={handleAddCardToBoard}
              // removeBoard={() => removeBoard(board.id)}
              // removeCard={removeCard}
              // updateCard={updateCard}
              // onDragEnd={onDragEnd}
              // onDragEnter={onDragEnter}
            />
          </GridItem>
        </Grid>
      ))}
    </Grid>
  );
};
