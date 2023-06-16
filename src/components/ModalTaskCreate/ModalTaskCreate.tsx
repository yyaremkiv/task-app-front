import { Formik } from "formik";
import { CustomTextFieldFormik } from "../CustomTextFieldFormik";
import { CustomNumberField } from "../CustomNumberField";
import * as Yup from "yup";
import {
  Box,
  IconButton,
  Slider,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  Title,
  Done as DoneIcon,
  Close as CloseIcon,
  Timeline as TimelineIcon,
  TaskAlt as TaskAltIcon,
} from "@mui/icons-material/";

interface IInitialValueCard {
  text: string;
  progress: number;
  completed: boolean;
}

const taskSchema = Yup.object().shape({
  text: Yup.string()
    .min(6, "Text must be at least 6 characters long.")
    .max(100, "Text cannot be longer than 40 characters.")
    .required("Text is required."),
  progress: Yup.number()
    .min(0, "Progress cannot be less than 0.")
    .max(100, "Progress cannot be greater than 100.")
    .required("Progress is required."),
});

interface IModalTaskCreateProps {
  handleAddNewTask: any;
  handleClose: () => void;
  isLoading?: boolean;
}

export const ModalTaskCreate = ({
  handleAddNewTask,
  handleClose,
  isLoading = false,
}: IModalTaskCreateProps) => {
  const initialValuesCard: IInitialValueCard = {
    text: "",
    progress: 0,
    completed: false,
  };

  return (
    <Formik
      onSubmit={(values: any) => {
        handleAddNewTask({ tasks: values });
      }}
      initialValues={initialValuesCard}
      validationSchema={taskSchema}
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

          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
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

          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
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
            <IconButton type="submit" disabled={isLoading}>
              {isLoading ? (
                <CircularProgress size={25} />
              ) : (
                <DoneIcon sx={{ color: "green" }} />
              )}
            </IconButton>
            <IconButton onClick={handleClose} disabled={isLoading}>
              <CloseIcon sx={{ color: isLoading ? null : "red" }} />
            </IconButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};
