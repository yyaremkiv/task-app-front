import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { CustomTextField } from "../CustomTextField";
import { CustomAutocomplete } from "../CustomAutocomplete";
import { v4 as uuidv4 } from "uuid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { LoadingButton } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ListTasks } from "../ListTasks/ListTasks";
import {
  Box,
  TextField,
  FormHelperText,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Title,
  Description,
  CalendarMonth,
  AssignmentTurnedIn,
  BookmarkBorder,
} from "@mui/icons-material/";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DataConfigInformation from "../../data/DataConfigInformation";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import "dayjs/locale/de";

const cardSchema = Yup.object().shape({
  title: Yup.string(),
  desc: Yup.string(),
});

interface IModalCardUpdate {
  card: any;
  boardId: string;
  updateCard: any;
  error: null | string;
  isLoading?: boolean;
}

interface IInitialValueCard {
  title: string;
  desc: string;
  dateStart: any;
  dateEnd: any;
  labels: any;
  tasks: any;
}

export const ModalCardUpdate: React.FC<IModalCardUpdate> = ({
  card,
  boardId,
  updateCard,
  error,
  isLoading = false,
}) => {
  const [showAddNewTask, setShowAddNewTask] = useState<boolean>(false);
  const [titleTask, setTitleTask] = useState<string>("");

  const initialValuesCard: IInitialValueCard = {
    title: card.title,
    desc: card.desc || "",
    dateStart: card.dateStart ? dayjs(card.dateStart) : null,
    dateEnd: card.dateEnd ? dayjs(card.dateEnd) : null,
    labels: card.labels || [],
    tasks: card.tasks,
  };

  const handleShowAddNewTask = () => setShowAddNewTask(!showAddNewTask);

  const handleAddNewTask = ({
    tasks,
    setFieldValue,
  }: {
    tasks: any;
    setFieldValue: any;
  }) => {
    setFieldValue("tasks", [
      ...tasks,
      { id: uuidv4(), text: titleTask, completed: false, progress: 0 },
    ]);
    setTitleTask("");
  };

  const handleUpdateCard = (dataCard: any) => {
    const updatedCard = { id: card.id, ...dataCard };
    updateCard({ boardId, cardId: card.id, updatedCard });
  };

  return (
    <Box>
      <Box sx={{ marginBottom: "1rem" }}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Card Information
        </Typography>
      </Box>
      <Formik
        onSubmit={(values: any) => {
          handleUpdateCard({
            ...values,
            dateStart: values.dateStart ? values.dateStart.$d : null,
            dateEnd: values.dateEnd ? values.dateEnd.$d : null,
          });
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
                isLoading={isLoading}
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
                isLoading={isLoading}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CalendarMonth color="primary" fontSize="large" />
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="de"
              >
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <DatePicker
                      //@ts-ignore
                      fullWidth
                      label="Date Start"
                      value={values.dateStart}
                      disabled={isLoading}
                      onChange={(date) => setFieldValue("dateStart", date)}
                      className={!values.dateStart ? "no-date-selected" : ""}
                    />
                    <FormHelperText
                      error={Boolean(touched.dateStart && errors.dateStart)}
                    >
                      {/* {touched.dateStart && errors.dateStart} */}
                    </FormHelperText>
                    <Tooltip title="Delete the start date" placement="top">
                      <IconButton
                        onClick={() => setFieldValue("dateStart", null)}
                        disabled={isLoading}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <DatePicker
                      //@ts-ignore
                      fullWidth
                      label="Date End"
                      value={values.dateEnd}
                      disabled={isLoading}
                      onChange={(date) => setFieldValue("dateEnd", date)}
                    />
                    <FormHelperText
                      error={Boolean(touched.dateEnd && errors.dateEnd)}
                    >
                      {/* {touched.dateEnd && errors.dateEnd} */}
                    </FormHelperText>
                    <Tooltip title="Delete the end date" placement="top">
                      <IconButton
                        onClick={() => setFieldValue("dateEnd", null)}
                        disabled={isLoading}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
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
                isLoading={isLoading}
              />
            </Box>

            <AssignmentTurnedIn color="primary" fontSize="large" />

            {showAddNewTask && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  border: "1px solid green",
                }}
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
      {error && <Typography style={{ color: "red" }}>{error}</Typography>}
    </Box>
  );
};
