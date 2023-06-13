import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { IAddBoard } from "../../Interfaces/DataTypes";
import { AppDispatch } from "../../redux/store";
import { CustomTextFieldFormik } from "../CustomTextFieldFormik";
import { CustomAutocompleteSingle } from "../CustomAutocompleteSingle";
import { CustomAutocomplete } from "../CustomAutocomplete";
import { FormConfig, IInitialValuesAddBoard } from "src/config/form.config";
import { Box, IconButton, Typography, CircularProgress } from "@mui/material";
import {
  Title,
  BookmarkBorder,
  Done,
  Close,
  Palette,
} from "@mui/icons-material/";
import TaskOperations from "../../redux/task/taskOperations";
import DataConfigInformation from "../../data/DataConfigInformation";

interface IModalBoardCreate {
  error: null | string;
  handleClose: () => void;
  isLoading?: boolean;
}

export const ModalBoardCreate = ({
  error,
  handleClose,
  isLoading = false,
}: IModalBoardCreate): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();

  const handleSubmitSearch = async ({
    title,
    labels,
    color: { color },
  }: IInitialValuesAddBoard) => {
    const newBoard: IAddBoard = {
      title,
      labels,
      color: color || "",
      cards: [],
    };
    const response: any = await dispatch(TaskOperations.addBoard(newBoard));

    if (response.error) return;
    if (!isLoading) handleClose();
  };

  return (
    <Formik
      onSubmit={handleSubmitSearch}
      initialValues={FormConfig.initialValuesAddBoard}
      validationSchema={FormConfig.boardSchema}
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Title color="primary" fontSize="large" />
            <CustomTextFieldFormik
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
            <Palette color="primary" fontSize="large" />
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
                <Done sx={{ color: "green" }} />
              )}
            </IconButton>
            <IconButton onClick={handleClose} disabled={isLoading}>
              <Close sx={{ color: isLoading ? null : "red" }} />
            </IconButton>
          </Box>
          {error ? <Typography color="red">{error}</Typography> : null}
        </form>
      )}
    </Formik>
  );
};
