import { useState } from "react";
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
import { FormChangeTask } from "../FormChangeTask/FormChangeTask";

interface IListTasksProp {
  values: any;
  changeFuncByFormik: any;
  isLoading?: boolean;
}

export const ListTasks: React.FC<IListTasksProp> = ({
  values,
  changeFuncByFormik,
  isLoading = false,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleClose = () => setOpenModal(false);

  const handleRemoveTask = ({ taskId }: { taskId: string }) => {
    changeFuncByFormik(
      "tasks",
      values.tasks.filter((task: any) => task.id !== taskId)
    );
  };

  const handleCheckDoneTask = ({ taskId }: { taskId: string }) => {
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

  const handleOpenTaskToUpdate = ({ taskId }: { taskId: string }) => {
    const task = values?.tasks.find((task: any) => task.id === taskId);
    if (task) {
      setTaskToUpdate(task);
      setOpenModal(true);
    }
  };

  const handleUpdateTask = ({
    taskId,
    updatedTask,
  }: {
    taskId: string;
    updatedTask: any;
  }) => {
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.45rem",
      }}
    >
      {values.tasks.map(
        ({
          id,
          text,
          completed,
          progress,
        }: {
          id: string;
          text: string;
          completed: boolean;
          progress: number;
        }) => (
          <Paper
            key={id}
            elevation={1}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
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
                disabled={isLoading}
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
              <IconButton
                onClick={() => handleOpenTaskToUpdate({ taskId: id })}
                disabled={isLoading}
              >
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
                disabled={isLoading}
              >
                <CloseIcon fontSize="medium" />
              </IconButton>
            </Box>
          </Paper>
        )
      )}

      <Modal open={openModal} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            p: "2rem 1rem",
            width: 400,
            backgroundColor: "background.paper",
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
