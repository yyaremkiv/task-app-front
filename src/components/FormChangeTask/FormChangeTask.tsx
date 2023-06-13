import { Box, CircularProgress, IconButton, Slider } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { Title } from "@mui/icons-material";
import { CustomTextFieldFormik } from "../CustomTextFieldFormik";
import TimelineIcon from "@mui/icons-material/Timeline";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { CustomNumberField } from "../CustomNumberField";

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

interface IFormChangeTaskProp {
  task: any;
  handleUpdateTask: any;
  handleClose: any;
  isLoading?: boolean;
}

interface IInitialVauesTask {
  text: string;
  progress: number;
}

export const FormChangeTask: React.FC<IFormChangeTaskProp> = ({
  task,
  handleUpdateTask,
  handleClose,
  isLoading = false,
}) => {
  const handleSubmitCreate = (values: IInitialVauesTask) => {
    const updatedTask = { ...task, ...values };
    handleUpdateTask({ taskId: task.id, updatedTask });
    handleClose();
  };

  const initialValuesTask: IInitialVauesTask = {
    text: task.text,
    progress: task.progress,
  };

  return (
    <Formik
      onSubmit={handleSubmitCreate}
      initialValues={initialValuesTask}
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
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
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
              <Slider
                valueLabelDisplay="auto"
                value={values.progress}
                onChange={(e: any) => {
                  setFieldValue("progress", e.target.value);
                }}
              />
            </Box>
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
            <IconButton onClick={() => handleClose(false)} disabled={isLoading}>
              <CloseIcon sx={{ color: isLoading ? null : "red" }} />
            </IconButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};
