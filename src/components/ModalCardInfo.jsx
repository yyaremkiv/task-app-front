import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { CustomTextField } from "./CustomTextField";
import { CustomAutocomplete } from "./CustomAutocomplete";
import { v4 as uuidv4 } from "uuid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Box,
  TextField,
  Paper,
  Checkbox,
  Typography,
  FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import {
  Title,
  Description,
  CalendarMonth,
  AssignmentTurnedIn,
  BookmarkBorder,
} from "@mui/icons-material/";
import DataConfigInformation from "../data/DataConfigInformation";
import EditIcon from "@mui/icons-material/Edit";
import { ListTasks } from "./ListTasks";

const cardSchema = Yup.object().shape({
  title: Yup.string(),
  desc: Yup.string(),
});

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
      { id: uuidv4(), text: titleTask, completed: false, progress: 0 },
    ]);
    setTitleTask("");
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
              <CustomTextField
                label="Title"
                name="title"
                formikFunc={{
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Description color="primary" fontSize="large" />
              <CustomTextField
                label="Description"
                name="desc"
                formikFunc={{
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                }}
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
              <CustomAutocomplete
                label="Set Labels of Board"
                changeFieldName="labels"
                value={values.labels}
                changeFieldFunction={setFieldValue}
                options={DataConfigInformation.labelCategoriesOfCard}
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

            <ListTasks
              values={values}
              changeFuncByFormik={setFieldValue}
              errors={errors}
              touched={touched}
              isLoading={isLoading}
            />

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
              <span>Save Changes</span>
            </LoadingButton>
          </form>
        )}
      </Formik>
    </Box>
  );
};
