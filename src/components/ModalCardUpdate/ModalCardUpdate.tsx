import { useState } from "react";
import { Formik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { CustomTextFieldFormik } from "../CustomTextFieldFormik";
import { CustomAutocomplete } from "../CustomAutocomplete";
import { ICard, ILabelsArray, ITask } from "src/Interfaces/DataTypes";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LoadingButton } from "@mui/lab";
import { ListTasks } from "../ListTasks/ListTasks";
import { FormConfig } from "src/config/form.config";
import {
  Box,
  FormHelperText,
  Tooltip,
  Typography,
  Button,
  IconButton,
  useTheme,
  Theme,
  useMediaQuery,
  Slider,
  FormControlLabel,
  CircularProgress,
  Checkbox,
} from "@mui/material";
import {
  Title,
  Description,
  CalendarMonth,
  BookmarkBorder,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Close as CloseIcon,
  AddBox as AddBoxIcon,
} from "@mui/icons-material/";
import DataConfigInformation from "../../data/DataConfigInformation";
import dayjs from "dayjs";
import "dayjs/locale/de";
import { CustomNumberField } from "../CustomNumberField";

import {
  Timeline as TimelineIcon,
  TaskAlt as TaskAltIcon,
} from "@mui/icons-material/";

interface IModalCardUpdateProps {
  card: ICard;
  boardId: string;
  updateCard: (data: {
    boardId: string;
    cardId: string;
    updatedCard: ICard;
  }) => void;
  error: string | null;
  isLoading?: boolean;
}

interface IInitialValueCard {
  title: string;
  desc: string;
  dateStart: any;
  dateEnd: any;
  labels: ILabelsArray | [];
  tasks: ITask[];
  text: string;
  progress: number;
  completed: boolean;
}

export const ModalCardUpdate = ({
  card,
  boardId,
  updateCard,
  error,
  isLoading = false,
}: IModalCardUpdateProps): JSX.Element => {
  const [showAddNewTask, setShowAddNewTask] = useState<boolean>(false);
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const initialValuesCard: IInitialValueCard = {
    title: card.title,
    desc: card.desc || "",
    dateStart: card.dateStart ? dayjs(card.dateStart) : null,
    dateEnd: card.dateEnd ? dayjs(card.dateEnd) : null,
    labels: card.labels,
    tasks: card.tasks,
    text: "",
    progress: 0,
    completed: false,
  };

  const handleShowAddNewTask = () => setShowAddNewTask(!showAddNewTask);

  const handleAddNewTask = async ({
    values,
    setFieldValue,
    setFieldError,
  }: {
    values: any;
    setFieldValue: (
      field: string,
      value: ITask[] | string | number | boolean
    ) => void;
    setFieldError: any;
  }) => {
    try {
      await FormConfig.taskSchema.validate(
        { text: values.text, progress: values.progress },
        { abortEarly: false }
      );

      setFieldValue("tasks", [
        ...values.tasks,
        {
          id: uuidv4(),
          text: values.text,
          completed: values.completed,
          progress: values.progress,
        },
      ]);
      setFieldValue("text", "");
      setFieldValue("progress", 0);
      setFieldValue("completed", false);
    } catch (err: any) {
      if (err.name === "ValidationError") {
        err.inner.forEach((validationError: any) => {
          setFieldError(validationError.path, validationError.message);
        });
      } else return;
    }
  };

  const handleUpdateCard = (dataCard: ICard) => {
    const updatedCard = { ...card, ...dataCard };
    updateCard({ boardId, cardId: card.id, updatedCard });
  };

  return (
    <Box>
      <Box sx={{ marginBottom: "1rem" }}>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", color: theme.palette.text.primary }}
        >
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
        validationSchema={FormConfig.cardSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          setFieldError,
        }) => (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Title color="primary" fontSize="large" />
              <CustomTextFieldFormik
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
              <CustomTextFieldFormik
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
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: isMobile ? "wrap" : "nowrap",
                    gap: "2rem",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      width: isMobile ? "100%" : "50%",
                    }}
                  >
                    <DatePicker
                      label="Date Start"
                      value={values.dateStart}
                      disabled={isLoading}
                      onChange={(date) => setFieldValue("dateStart", date)}
                      className={!values.dateStart ? "no-date-selected" : ""}
                      sx={{ width: "100%" }}
                    />
                    <FormHelperText
                      error={Boolean(touched.dateStart && errors.dateStart)}
                    >
                      {touched.dateStart &&
                        errors.dateStart &&
                        String(touched.dateStart && errors.dateStart)}
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
                      width: isMobile ? "100%" : "50%",
                    }}
                  >
                    <DatePicker
                      label="Date End"
                      value={values.dateEnd}
                      disabled={isLoading}
                      onChange={(date) => setFieldValue("dateEnd", date)}
                      sx={{ width: "100%" }}
                    />
                    <FormHelperText
                      error={Boolean(touched.dateEnd && errors.dateEnd)}
                    >
                      {touched.dateEnd &&
                        errors.dateEnd &&
                        String(touched.dateEnd && errors.dateEnd)}
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

            <Box sx={{ display: "flex", justifyContent: "right" }}>
              <Button
                startIcon={<AddBoxIcon />}
                onClick={handleShowAddNewTask}
                sx={{ textTransform: "none", fontSize: "1.2rem" }}
              >
                Add New Task
              </Button>
            </Box>

            {showAddNewTask && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  border: "1px solid green",
                  padding: "0.5rem",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <Title color="primary" fontSize="large" />
                  <CustomTextFieldFormik
                    label="Text"
                    name="text"
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

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <TimelineIcon color="primary" fontSize="large" />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <CustomNumberField
                      label="Progress"
                      name="progress"
                      minValue={0}
                      maxValue={100}
                      formikFunc={{
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                      }}
                    />
                  </Box>
                </Box>

                <Box sx={{ padding: "0 0 0 2.8rem" }}>
                  <Slider
                    valueLabelDisplay="auto"
                    value={values.progress}
                    onChange={(e: any) => {
                      setFieldValue("progress", e.target.value);
                    }}
                  />
                </Box>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <TaskAltIcon color="primary" fontSize="large" />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.completed}
                        onChange={() => {
                          setFieldValue("completed", !values.completed);
                        }}
                        disabled={isLoading}
                      />
                    }
                    label="Task completed"
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <IconButton
                    disabled={isLoading}
                    onClick={() =>
                      handleAddNewTask({ values, setFieldValue, setFieldError })
                    }
                  >
                    {isLoading ? (
                      <CircularProgress size={25} />
                    ) : (
                      <DoneIcon sx={{ color: "green" }} />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={handleShowAddNewTask}
                    disabled={isLoading}
                  >
                    <CloseIcon sx={{ color: isLoading ? null : "red" }} />
                  </IconButton>
                </Box>
              </Box>
            )}

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
