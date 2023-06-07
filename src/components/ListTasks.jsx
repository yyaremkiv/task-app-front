import { useState } from "react";
import * as Yup from "yup";
import {
  Box,
  Checkbox,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { FormChangeTask } from "./FormChangeTask";

export const ListTasks = ({ isLoading, values, changeFuncByFormik }) => {
  const [openModal, setOpenModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleRemoveTask = ({ taskId }) => {
    changeFuncByFormik(
      "tasks",
      values.tasks.filter((task) => task.id !== taskId)
    );
  };

  const handleCheckDoneTask = ({ taskId }) => {
    let newTasks = JSON.parse(JSON.stringify(values.tasks));

    for (let i = 0; i < newTasks.length; i++) {
      if (newTasks[i].id === taskId) {
        newTasks[i].completed = Boolean(!newTasks[i].completed);
        newTasks[i].progress = Boolean(newTasks[i].completed) ? 100 : 0;
        break;
      }
    }

    changeFuncByFormik("tasks", newTasks);
  };

  const handleOpenTaskToUpdate = ({ taskId }) => {
    const task = values?.tasks.find((task) => task.id === taskId);
    if (task) {
      setTaskToUpdate(task);
      setOpenModal(true);
    }
  };

  const handleUpdateTask = ({ taskId, updatedTask }) => {
    let newTasks = JSON.parse(JSON.stringify(values.tasks));

    for (let i = 0; i < newTasks.length; i++) {
      if (newTasks[i].id === taskId) {
        newTasks[i] = updatedTask;
        break;
      }
    }
    changeFuncByFormik("tasks", newTasks);
  };

  return (
    <Box>
      {values.tasks.map(({ id, text, completed, progress }) => (
        <Paper
          key={id}
          elevation={1}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "3px",
            marginBottom: "5px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Checkbox
              checked={completed}
              onChange={() =>
                handleCheckDoneTask({
                  taskId: id,
                })
              }
            />
            <Box>
              <Typography
                variant="subtitle1"
                align="left"
                sx={{
                  textDecoration: completed ? "line-through" : "none",
                }}
              >
                {text}
              </Typography>
              <Typography> This is progress: {progress}%</Typography>
            </Box>
          </Box>
          <Box>
            <IconButton onClick={() => handleOpenTaskToUpdate({ taskId: id })}>
              <EditIcon fontSize="medium" />
            </IconButton>
            <IconButton
              aria-label="close"
              color="secondary"
              onClick={() =>
                handleRemoveTask({
                  taskId: id,
                })
              }
            >
              <CloseIcon fontSize="medium" />
            </IconButton>
          </Box>
        </Paper>
      ))}

      <Modal open={openModal} onClose={handleClose}>
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
          <FormChangeTask
            task={taskToUpdate}
            handleUpdateTask={handleUpdateTask}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </Box>
  );
};
