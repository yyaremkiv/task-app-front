import { useState } from "react";
import {
  Box,
  Checkbox,
  IconButton,
  Modal,
  Paper,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

export const ListTasks = ({
  errors,
  touched,
  isLoading,
  values,
  changeFuncByFormik,
}) => {
  const [openModal, setOpenModal] = useState(false);

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
        break;
      }
    }

    changeFuncByFormik("tasks", newTasks);
  };

  const handleUpdateTask = ({ taskId }) => {
    setOpenModal(true);
  };

  return (
    <Box>
      {values.tasks.map(({ id, text, completed }) => (
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
            <Typography
              variant="subtitle1"
              align="left"
              sx={{
                textDecoration: completed ? "line-through" : "none",
              }}
            >
              {text}
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={() => handleUpdateTask({ taskId: id })}>
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              border: "1px solid gray",
            }}
          >
            <Typography>Title:</Typography>
            <TextField
              multiline
              fullWidth
              size="small"
              label="Title"
              // value={titleBoard}
              // onChange={(e) => setTitleBoard(e.target.value)}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <TextField
                label="Progress"
                name="progress"
                size="small"
                value={values.progress}
                error={Boolean(touched.progress && errors.progress)}
                helperText={touched.progress && errors.progress}
                disabled={isLoading}
                onChange={(e) => {
                  changeFuncByFormik("progress", e.target.value);
                }}
              />

              <Slider
                aria-label="Default"
                valueLabelDisplay="auto"
                value={values.progress}
                onChange={(e) => {
                  changeFuncByFormik("progress", e.target.value);
                }}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
