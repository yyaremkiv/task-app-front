import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Board } from "../Board/Board";
import { ModalCardUpdate } from "../ModalCardUpdate/ModalCardUpdate";
import { Box, Grid, Modal, Paper } from "@mui/material";
import BoardHandler from "../../helpers/boardHandler";
import TaskOperations from "../../redux/task/taskOperations";

export const ListBoards = ({ boards, page, limit, view, error, isLoading }) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentBoardId, setCurrentBoardId] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(TaskOperations.getBoards({ params: { page, limit } }));
  }, [dispatch, page, limit]);

  const handleOpen = ({ boardId, card }) => {
    setCurrentBoardId(boardId);
    setCurrentCard(card);
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

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

  const handleUpdateCard = async ({ boardId, cardId, updatedCard }) => {
    const updatedBoard = BoardHandler.updateCard({
      boards,
      boardId,
      cardId,
      updatedCard,
    });
    if (!updatedBoard) return;

    const response = await dispatch(
      TaskOperations.updateBoard({ boardId, board: updatedBoard })
    );
    if (response.error) return;
    if (!isLoading) setOpenModal(false);
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
          <Paper
            sx={{
              padding: "1rem",
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
              removeCard={handleRemoveCard}
              handleOpen={handleOpen}
              isLoading={isLoading}
            />
          </Paper>
        </Grid>
      ))}
      <Modal open={openModal} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            maxHeight: "85vh",
            overflowY: "auto",
            padding: "1rem",
            backgroundColor: "background.paper",
            borderRadius: "0.5rem",
            transform: "translate(-50%, -50%)",
          }}
        >
          <ModalCardUpdate
            card={currentCard}
            boardId={currentBoardId}
            updateCard={handleUpdateCard}
            error={error}
            isLoading={isLoading}
          />
        </Box>
      </Modal>
    </Grid>
  );
};
