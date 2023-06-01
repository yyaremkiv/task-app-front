import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskOperations from "../redux/task/taskOperations";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import { GridItem } from "./GridItem";
import { Board } from "./Board";
import BoardHandler from "../helpers/boardHandler.js";
import { FilterBoards } from "./FilterBoards";

export const ListBoards = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const boards = useSelector((state) => state.task.data);
  const totalBoards = useSelector((state) => state.task.totalBords);
  const isLoading = useSelector((state) => state.task.isLoading);
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

  const handleChangePage = (_, newPageValue) => {
    setPage(newPageValue);
  };

  const handleChangeLimit = (value) => {
    setPage(1);
    setLimit(value);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <FilterBoards page={page} limit={limit} isLoading={isLoading} />

      <Box>
        <Box
          sx={{
            border: "1px solid gray",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
            <InputLabel id="demo-select-small-label">Count</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={limit}
              label="Count"
              onChange={(e) => handleChangeLimit(e.target.value)}
            >
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </FormControl>
          <Typography>All Boards: {totalBoards}</Typography>
          <Typography>Display: {boards.length}</Typography>
        </Box>

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

        {boards.length < totalBoards ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            <Pagination
              page={page}
              disabled={isLoading}
              count={Math.ceil((totalBoards || 1) / limit)}
              onChange={handleChangePage}
            />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};
