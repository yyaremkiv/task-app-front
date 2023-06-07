import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import { GridItem } from "./GridItem";
import { Board } from "./Board";
import BoardHandler from "../helpers/boardHandler";
import TaskOperations from "../redux/task/taskOperations";

export const ListBoards = ({ boards, page, limit, isLoading, view }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(TaskOperations.getBoards({ params: { page, limit } }));
  }, [dispatch, page, limit]);

  const handleBoardUpdate = ({ boards, boardId, payload }) => {
    const updatedBoard = BoardHandler.updateBoard({
      boards,
      boardId,
      payload,
    });
    if (!updatedBoard) return;
    dispatch(TaskOperations.updateBoard({ boardId, board: updatedBoard }));
  };

  const handleChangeTitleBoard = ({ boardId, titleBoard }) => {
    handleBoardUpdate({ boards, boardId, payload: { title: titleBoard } });
  };

  const handleChangeLabelBoard = ({ boardId, labels }) =>
    handleBoardUpdate({ boards, boardId, payload: { labels } });

  const handleChangeColorBoard = ({ boardId, color }) =>
    handleBoardUpdate({ boards, boardId, payload: { color } });

  const handleRemoveBoard = ({ boardId }) =>
    dispatch(TaskOperations.removeBoard({ boardId }));

  const handleAddCardToBoard = ({ boardId, titleCard }) => {
    const updatedBoard = BoardHandler.addCard({ boards, boardId, titleCard });
    if (!updatedBoard) return;
    dispatch(TaskOperations.updateBoard({ boardId, board: updatedBoard }));
  };

  const handelUpdateCard = ({ boardId, cardId, updatedCard }) => {
    const updatedBoard = BoardHandler.updateCard({
      boards,
      boardId,
      cardId,
      updatedCard,
    });
    if (!updatedBoard) return;

    dispatch(TaskOperations.updateBoard({ boardId, board: updatedBoard }));
  };

  const handleRemoveCard = ({ boardId, cardId }) => {
    const updatedBoard = BoardHandler.removeCard({ boards, boardId, cardId });
    if (!updatedBoard) return;
    dispatch(TaskOperations.updateBoard({ boardId, board: updatedBoard }));
  };

  return (
    <Grid container spacing={2} sx={{ wdith: "100%" }}>
      {boards?.map((board) => (
        <Grid key={board.id} item xs={view}>
          <GridItem
            sx={{
              border: board.color ? `3px solid ${board.color || "gray"}` : null,
              borderRadius: "0.75rem",
            }}
          >
            <Board
              board={board}
              handleChangeTitleBoard={handleChangeTitleBoard}
              handleChangeLabelBoard={handleChangeLabelBoard}
              handleChangeColorBoard={handleChangeColorBoard}
              handleRemoveBoard={handleRemoveBoard}
              addCard={handleAddCardToBoard}
              updateCard={handelUpdateCard}
              removeCard={handleRemoveCard}
            />
          </GridItem>
        </Grid>
      ))}
    </Grid>
  );
};
