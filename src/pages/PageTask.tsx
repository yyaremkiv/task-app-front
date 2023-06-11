import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterListOption } from "../components/FilterListOption/FilterListOption";
import { FilterBoards } from "../components/FilterBoards/FilterBoards";
import { ListBoards } from "../components/ListBoards/ListBoards";
import { ModalBoardCreate } from "../components/ModalBoardCreate/ModalBoardCreate";
import { Box, Modal, Pagination, Grid, useMediaQuery } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import { MenuAddBoard } from "../components/MenuAddBoard";
import { RootState, AppDispatch } from "../redux/store";
import TaskOperations from "../redux/task/taskOperations";

export const PageTask = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [view, setView] = useState<number>(6);
  const boards = useSelector((state: RootState) => state.task.data);
  const totalBoards = useSelector((state: RootState) => state.task.totalBords);
  const isLoading = useSelector((state: RootState) => state.task.isLoading);
  const error = useSelector((state: RootState) => state.task.error);
  const dispatch: AppDispatch = useDispatch();
  const theme: Theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 700px)");

  useEffect(() => {
    dispatch(TaskOperations.getBoards({ params: { page, limit } }));
  }, [dispatch, page, limit]);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleChangePage = (_: any, newPageValue: number) =>
    setPage(newPageValue);

  const handleChangeLimit = (value: number) => {
    setPage(1);
    setLimit(value);
  };

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12}>
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
        </Grid>

        {openFilter ? (
          <Grid item xs={isNonMobileScreens ? 3 : 12}>
            <FilterBoards page={page} limit={limit} isLoading={isLoading} />
          </Grid>
        ) : null}

        <Grid item xs={openFilter ? (isNonMobileScreens ? 9 : 12) : 12}>
          <ListBoards
            boards={boards}
            page={page}
            limit={limit}
            view={view}
            error={error}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>

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

      <MenuAddBoard handleOpen={handleOpen} />

      <Modal open={openModal} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            maxWidth: "50vw",
            maxHeight: "85vh",
            overflowY: "auto",
            padding: "1rem",
            backgroundColor: theme.palette.background.light,
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
    </Box>
  );
};
