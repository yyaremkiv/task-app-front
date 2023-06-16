import { useState } from "react";
import { useDispatch } from "react-redux";
import { BoardItem } from "../BoardItem/BoardItem";
import { ModalCardUpdate } from "../ModalCardUpdate/ModalCardUpdate";
import { AppDispatch } from "../../redux/store";
import { Box, Grid, Paper } from "@mui/material";
import { ILabelsArray, IBoard, ICard } from "../../Interfaces/DataTypes";
import { CustomModalWindow } from "../CustomModalWindow";
import BoardHandler from "../../helpers/boardHandler";
import TaskOperations from "../../redux/task/taskOperations";

interface IListBoardsProps {
  boards: IBoard[];
  view: number;
  error: string | null;
  isLoading?: boolean;
}

interface IPayloadUpdateBoard {
  title?: string;
  labels?: ILabelsArray;
  color?: string;
}

interface IHandleBoardUpdate {
  boards: IBoard[];
  boardId: string;
  payload: IPayloadUpdateBoard;
}

interface IHandleUpdateCard {
  boardId: string;
  cardId: string;
  updatedCard: ICard;
}

export const ListBoards = ({
  boards,
  view,
  error,
  isLoading = false,
}: IListBoardsProps): JSX.Element => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentBoardId, setCurrentBoardId] = useState<string | null>(null);
  const [currentCard, setCurrentCard] = useState<ICard | null>(null);
  const dispatch: AppDispatch = useDispatch();

  const handleOpen = ({ boardId, card }: { boardId: string; card: ICard }) => {
    setCurrentBoardId(boardId);
    setCurrentCard(card);
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const handleBoardUpdate = ({
    boards,
    boardId,
    payload,
  }: IHandleBoardUpdate): void => {
    const updatedBoard = BoardHandler.updateBoard({
      boards,
      boardId,
      payload,
    });
    if (!updatedBoard) return;
    dispatch(TaskOperations.updateBoard({ boardId, board: updatedBoard }));
  };

  const handleChangeTitleBoard = ({
    boardId,
    titleBoard,
  }: {
    boardId: string;
    titleBoard: string;
  }): void => {
    handleBoardUpdate({ boards, boardId, payload: { title: titleBoard } });
  };

  const handleChangeLabelBoard = ({
    boardId,
    labels,
  }: {
    boardId: string;
    labels: ILabelsArray;
  }) => handleBoardUpdate({ boards, boardId, payload: { labels } });

  const handleChangeColorBoard = ({
    boardId,
    color,
  }: {
    boardId: string;
    color: string;
  }) => handleBoardUpdate({ boards, boardId, payload: { color } });

  const handleRemoveBoard = ({ boardId }: { boardId: string }) =>
    dispatch(TaskOperations.removeBoard({ boardId }));

  const handleAddCardToBoard = ({
    boardId,
    titleCard,
  }: {
    boardId: string;
    titleCard: string;
  }): void => {
    const updatedBoard = BoardHandler.addCard({ boards, boardId, titleCard });
    if (!updatedBoard) return;
    dispatch(TaskOperations.updateBoard({ boardId, board: updatedBoard }));
  };

  const handleUpdateCard = async ({
    boardId,
    cardId,
    updatedCard,
  }: IHandleUpdateCard) => {
    const updatedBoard = BoardHandler.updateCard({
      boards,
      boardId,
      cardId,
      updatedCard,
    });
    if (!updatedBoard) return;

    const response: any = await dispatch(
      TaskOperations.updateBoard({ boardId, board: updatedBoard })
    );
    if (response.error) return;
    if (!isLoading) setOpenModal(false);
  };

  const handleRemoveCard = ({
    boardId,
    cardId,
  }: {
    boardId: string;
    cardId: string;
  }): void => {
    const updatedBoard = BoardHandler.removeCard({ boards, boardId, cardId });
    if (!updatedBoard) return;
    dispatch(TaskOperations.updateBoard({ boardId, board: updatedBoard }));
  };

  return (
    <Box>
      <Grid container>
        {boards?.map((board: any) => (
          <Grid
            key={board.id}
            item
            xs={view}
            sx={{ padding: "0.5rem", width: "100%" }}
          >
            <Paper
              sx={{
                border: board.color
                  ? `3px solid ${board.color || "gray"}`
                  : null,
                borderRadius: "0.75rem",
              }}
            >
              <BoardItem
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
      </Grid>

      {currentBoardId && currentCard && (
        <CustomModalWindow open={openModal} onCloseFunc={handleClose}>
          <ModalCardUpdate
            card={currentCard}
            boardId={currentBoardId}
            updateCard={handleUpdateCard}
            error={error}
            isLoading={isLoading}
          />
        </CustomModalWindow>
      )}
    </Box>
  );
};
