import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { Box, IconButton, Typography } from "@mui/material";
import { Title, BookmarkBorder } from "@mui/icons-material/";
import { CustomAutocomplete } from "../CustomAutocomplete";
import { CustomAutocompleteSingle } from "../CustomAutocompleteSingle";
import { CustomTextField } from "../CustomTextField";
import TaskOperations from "../../redux/task/taskOperations";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import PaletteIcon from "@mui/icons-material/Palette";
import DataConfigInformation from "../../data/DataConfigInformation";
import CircularProgress from "@mui/material/CircularProgress";

const initialValuesBoard = {
  title: "",
  labels: [],
  color: {},
};

const boardSchema = Yup.object().shape({
  title: Yup.string()
    .min(6, "Title must be at least 6 characters long.")
    .max(40, "Title cannot be longer than 40 characters.")
    .required("Title is required."),
});

export const ModalBoardCreate = ({ handleClose, isLoading, error }) => {
  const dispatch = useDispatch();

  const handleSubmitSearch = async ({ title, labels, color: { color } }) => {
    const newBoard = { title, labels, color: color || "", cards: [] };
    const response = await dispatch(TaskOperations.addBoard(newBoard));

    if (response.error) return;
    if (!isLoading) handleClose();
  };

  return (
    <Formik
      onSubmit={handleSubmitSearch}
      initialValues={initialValuesBoard}
      validationSchema={boardSchema}
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
              formikFunc={{ values, errors, touched, handleBlur, handleChange }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <BookmarkBorder color="primary" fontSize="large" />
            <CustomAutocomplete
              label="Set Labels of Board"
              changeFieldName="labels"
              value={values.labels}
              changeFieldFunction={setFieldValue}
              options={DataConfigInformation.labelCategories}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <PaletteIcon color="primary" fontSize="large" />
            <CustomAutocompleteSingle
              label="Set Color Of Border"
              changeFieldName="color"
              changeFieldFunction={setFieldValue}
              options={DataConfigInformation.colors}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
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
          {error ? <Typography color="red">{error}</Typography> : null}
        </form>
      )}
    </Formik>
  );
};
