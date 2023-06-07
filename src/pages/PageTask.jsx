import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterListOption } from "../components/FilterListOption";
import { FilterBoards } from "../components/FilterBoards";
import { ListBoards } from "../components/ListBoards";
import { ModalBoardCreate } from "../components/ModalBoardCreate";
import { Container, Box, Modal, IconButton, Pagination } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskOperations from "../redux/task/taskOperations";

export const PageTask = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [view, setView] = useState(6);
  const boards = useSelector((state) => state.task.data);
  const totalBoards = useSelector((state) => state.task.totalBords);
  const isLoading = useSelector((state) => state.task.isLoading);
  const error = useSelector((state) => state.task.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(TaskOperations.getBoards({ params: { page, limit } }));
  }, [dispatch, page, limit]);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleChangePage = (_, newPageValue) => setPage(newPageValue);

  const handleChangeLimit = (value) => {
    setPage(1);
    setLimit(value);
  };

  return (
    <Container
      sx={{
        padding: "1rem 2rem",
        border: "1px solid green",
      }}
    >
      <FilterListOption
        showFilter={openFilter}
        showFilterFunc={setOpenFilter}
        view={view}
        viewChangeFunc={setView}
        limit={limit}
        changeLimit={handleChangeLimit}
        shown={boards.length}
        total={totalBoards}
      />

      <Box sx={{ display: "flex" }}>
        <Box sx={{ padding: "0 1rem 0 0" }}>
          {openFilter ? (
            <FilterBoards page={page} limit={limit} isLoading={isLoading} />
          ) : null}
        </Box>

        <Box>
          <ListBoards
            boards={boards}
            page={page}
            limit={limit}
            view={view}
            isLoading={isLoading}
          />
        </Box>
      </Box>

      {boards.length < totalBoards && (
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
      )}

      <Box
        onClick={() => handleOpen("board")}
        sx={{ position: "absolute", right: "4rem", bottom: "3rem" }}
      >
        <IconButton sx={{ backgroundColor: "tomato", fontSize: "3rem" }}>
          <AddIcon sx={{ fontSize: 80, color: "white" }} />
        </IconButton>
      </Box>

      <Modal open={openModal} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            maxHeight: "85vh",
            overflowY: "auto",
            padding: "1rem",
            bgcolor: "background.paper",
            borderRadius: "0.5rem",
            transform: "translate(-50%, -50%)",
          }}
        >
          <ModalBoardCreate
            handleClose={handleClose}
            isLoading={isLoading}
            error={error}
          />
        </Box>
      </Modal>
    </Container>
  );
};
