import { Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { TextField, Paper, Checkbox } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { v4 as uuidv4 } from "uuid";
import {
  Title,
  Description,
  CalendarMonth,
  AssignmentTurnedIn,
  BookmarkBorder,
} from "@mui/icons-material/";

const cardSchema = Yup.object().shape({
  title: Yup.string(),
  desc: Yup.string(),
});

const labelCategories = [
  { color: "#f44336", text: "label1" },
  { color: "#e91e63", text: "label2" },
  { color: "#9c27b0", text: "label3" },
  { color: "#673ab7", text: "label4" },
  { color: "#2196f3", text: "label5" },
  { color: "#03a9f4", text: "label6" },
  { color: "#00bcd4", text: "label7" },
  { color: "#009688", text: "label8" },
  { color: "#4caf50", text: "label9" },
  { color: "#8bc34a", text: "label10" },
  { color: "#8bc34a", text: "label11" },
  { color: "#cddc39", text: "label12" },
  { color: "#ffeb3b", text: "label13" },
  { color: "#ffc107", text: "label14" },
  { color: "#ff9800", text: "label15" },
  { color: "#ff5722", text: "label16" },
];

export const ModalCardInfo = ({ card, updateCard }) => {
  const [showAddNewTask, setShowAddNewTask] = useState(false);
  const [titleTask, setTitleTask] = useState("");
  const isLoading = false;

  const initialValuesCard = {
    title: card.title,
    desc: card.desc || "",
    date: dayjs(card.date),
    labels: card.labels || [],
    tasks: card.tasks,
  };

  const handleShowAddNewTask = () => setShowAddNewTask(!showAddNewTask);

  const handleAddNewTask = ({ tasks, setFieldValue }) => {
    setFieldValue("tasks", [
      ...tasks,
      { id: uuidv4(), text: titleTask, completed: false },
    ]);
    setTitleTask("");
  };

  const handleRemoveTask = ({ tasks, taskId, setFieldValue }) => {
    setFieldValue(
      "tasks",
      tasks.filter((task) => task.id !== taskId)
    );
  };

  const handleCheckDoneTask = ({ tasks, taskId, setFieldValue }) => {
    let newTasks = JSON.parse(JSON.stringify(tasks));

    for (let i = 0; i < newTasks.length; i++) {
      if (newTasks[i].id === taskId) {
        newTasks[i].completed = Boolean(!newTasks[i].completed);
        break;
      }
    }

    setFieldValue("tasks", newTasks);
  };

  return (
    <Box>
      <Formik
        onSubmit={(values) => {
          updateCard({ ...values, date: values.date ? values.date.$d : "" });
        }}
        initialValues={initialValuesCard}
        validationSchema={cardSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Title color="primary" fontSize="large" />
              <TextField
                label="Title"
                name="title"
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
                disabled={isLoading}
                style={{ height: "60px" }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Description color="primary" fontSize="large" />
              <TextField
                label="Description"
                name="desc"
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.desc}
                error={Boolean(touched.desc && errors.desc)}
                helperText={touched.desc && errors.desc}
                disabled={isLoading}
                style={{ height: "60px" }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CalendarMonth color="primary" fontSize="large" />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <Box>
                    <DatePicker
                      label="Date Start"
                      fullWidth
                      value={values.date}
                      disabled={isLoading}
                      onChange={(date) => setFieldValue("date", date)}
                    />
                    <FormHelperText
                      error={Boolean(touched.dateStart && errors.dateStart)}
                    >
                      {touched.dateStart && errors.dateStart}
                    </FormHelperText>
                  </Box>

                  <Box>
                    <DatePicker
                      label="Date End"
                      fullWidth
                      value={values.dateEnd}
                      disabled={isLoading}
                      onChange={(date) => setFieldValue("dateEnd", date)}
                    />
                    <FormHelperText
                      error={Boolean(touched.dateEnd && errors.dateEnd)}
                    >
                      {touched.dateEnd && errors.dateEnd}
                    </FormHelperText>
                  </Box>
                </Box>
              </LocalizationProvider>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <BookmarkBorder color="primary" fontSize="large" />
              <Autocomplete
                id="size-small-outlined-multi"
                multiple
                fullWidth
                options={labelCategories}
                getOptionLabel={(option) => option.text}
                value={values.labels}
                disabled={
                  labelCategories.length === 0 || isLoading ? true : false
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Set Label"
                    placeholder="Add more"
                  />
                )}
                onChange={(_, selectedValues) => {
                  setFieldValue("labels", selectedValues);
                }}
              />
            </Box>

            <AssignmentTurnedIn color="primary" fontSize="large" />
            {/* Start Add New Task */}
            {showAddNewTask && (
              <Box
                sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <TextField
                  label="Add New Task"
                  value={titleTask}
                  onChange={(e) => setTitleTask(e.target.value)}
                  style={{ height: "60px", width: "100%" }}
                />
                <IconButton
                  onClick={() =>
                    handleAddNewTask({ tasks: values.tasks, setFieldValue })
                  }
                >
                  <DoneIcon />
                </IconButton>
                <IconButton onClick={handleShowAddNewTask}>
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
            <Box>
              <Button onClick={handleShowAddNewTask}>Add New Task</Button>
            </Box>
            {/* End Add New Task */}
            <Box>
              {values.tasks.length > 0
                ? values.tasks.map(({ id, text, completed }) => (
                    <Paper
                      elevation={1}
                      key={id}
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
                              tasks: values.tasks,
                              taskId: id,
                              setFieldValue,
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
                      <IconButton
                        aria-label="close"
                        color="secondary"
                        onClick={() =>
                          handleRemoveTask({
                            tasks: values.tasks,
                            taskId: id,
                            setFieldValue,
                          })
                        }
                      >
                        <CloseIcon fontSize="medium" />
                      </IconButton>
                    </Paper>
                  ))
                : null}
            </Box>

            <LoadingButton
              variant="contained"
              loading={isLoading}
              disabled={isLoading}
              loadingPosition="center"
              type="submit"
              sx={{
                margin: "0 auto 1rem auto",
                padding: "0.25rem 4rem",
                fontSize: "0.9rem",
                color: "#fff",
              }}
            >
              <span>Update</span>
            </LoadingButton>
          </form>
        )}
      </Formik>
    </Box>
  );
};
