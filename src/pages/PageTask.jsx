import { useState } from "react";
import { useDispatch } from "react-redux";
import { CustomInput } from "../components/CustomInput";
import { ItemAddBoardBtn } from "../components/styles";
import { Container, Box, Modal, Button, IconButton } from "@mui/material";
import TaskService from "../services/TaskService";
import { Filter } from "../components/FilterBoards";
import { ListBoards } from "../components/ListBoards";
import TaskOperations from "../redux/task/taskOperations";
import BoardCreate from "../config/boardCreate";
import { ModalBoardCreate } from "../components/ModalBoardCreate";
import AddIcon from "@mui/icons-material/Add";

export const PageTask = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isLoading, setIsLoading] = useState(false);
  const [boards, setBoards] = useState([]);
  const [targetCard, setTargetCard] = useState({
    boardId: 0,
    cardId: 0,
  });
  const dispatch = useDispatch();

  const handleAddBoard = (title) =>
    dispatch(TaskOperations.addBoard(new BoardCreate({ title })));

  // drag&drop cards
  const onDragEnd = async (boardId, cardId) => {
    setIsLoading(true);
    const sourceBoardIndex = boards.findIndex((el) => {
      return el.id === boardId;
    });
    if (sourceBoardIndex === -1) return;

    const sourceCardIndex = boards[sourceBoardIndex].cards?.findIndex((el) => {
      return el.id === cardId;
    });
    if (sourceCardIndex === -1) return;

    const targetBoardIndex = boards.findIndex(
      (el) => el.id === targetCard.boardId
    );

    if (targetBoardIndex === -1) return;

    const targetCardIndex = boards[targetBoardIndex].cards?.findIndex(
      (el) => el.id === targetCard.cardId
    );
    if (targetCardIndex === -1) return;

    const tempBoardList = [...boards];

    const sourceCard = tempBoardList[sourceBoardIndex].cards[sourceCardIndex];
    tempBoardList[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
    tempBoardList[targetBoardIndex].cards.splice(
      targetCardIndex,
      0,
      sourceCard
    );

    const boardDel = tempBoardList[sourceBoardIndex];
    const boardAdded = tempBoardList[targetBoardIndex];

    const [board1, board2] = await Promise.all([
      TaskService.updateBoard({
        boardId: boardDel.id,
        board: boardDel,
      }),
      TaskService.updateBoard({
        boardId: boardAdded.id,
        board: boardAdded,
      }),
    ]);

    const updateBoardList = boards.map((board) => {
      if (board.id === board1.data.id) {
        return board1.data;
      }
      if (board.id === board2.data.id) {
        return board2.data;
      }
      return board;
    });

    setBoards(updateBoardList);
    setTargetCard({ boardId: 0, cardId: 0 });
    setIsLoading(false);
  };

  const onDragEnter = (boardId, cardId) => {
    if (targetCard.cardId === cardId) return;
    setTargetCard({ boardId: boardId, cardId: cardId });
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        padding: "20px 30px",
        margin: "0 auto",
      }}
    >
      <ListBoards />

      <Box
        onClick={handleOpen}
        sx={{ position: "absolute", right: "4rem", bottom: "3rem" }}
      >
        <IconButton sx={{ backgroundColor: "tomato", fontSize: "3rem" }}>
          <AddIcon sx={{ fontSize: 80, color: "white" }} />
        </IconButton>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            p: "2rem 1rem",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "0.5rem",
            transform: "translate(-50%, -50%)",
          }}
        >
          <ModalBoardCreate handleClose={handleClose} />
        </Box>
      </Modal>
    </Container>
  );
};
