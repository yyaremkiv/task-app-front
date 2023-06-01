import { Formik } from "formik";
import * as Yup from "yup";
import {
  Autocomplete,
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Title, BookmarkBorder } from "@mui/icons-material/";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import TaskOperations from "../redux/task/taskOperations";
import BoardCreate from "../config/boardCreate";
import PaletteIcon from "@mui/icons-material/Palette";

const initialValuesBoard = {
  title: "",
  labels: [],
  color: "",
};

const boardSchema = Yup.object().shape({
  title: Yup.string()
    .min(4, "Title must be at least 4 characters long.")
    .required("Title is required."),
});

const labelCategories = [
  { text: "priority: critical", color: "#b60205" },
  { text: "priority: high", color: "#d93f0b" },
  { text: "priority: low", color: "#0e8a16" },
  { text: "priority: medium", color: "#fbca04" },
  { text: "status: can't reproduce", color: "#fec1c1" },
  { text: "status: confirmed", color: "#215cea" },
  { text: "status: duplicate", color: "#cfd3d7" },
  { text: "status: needs information", color: "#fef2c0" },
  { text: "status: wont do/fix", color: "#eeeeee" },
];

const colors = [
  { label: "Red", color: "#f44336" },
  { label: "Pink", color: "#e91e63" },
  { label: "Purple", color: "#9c27b0" },
  { label: "Blue", color: "#2196f3" },
  { label: "Green", color: "#4caf50" },
  { label: "Yellow", color: "#ffeb3b" },
  { label: "Orange", color: "#ff9800" },
  { label: "Grey", color: "#9e9e9e" },
];

export const ModalBoardCreate = ({ handleClose }) => {
  const dispatch = useDispatch();
  const isLoading = false;

  return (
    <Formik
      onSubmit={({ title, labels, color }) => {
        dispatch(
          TaskOperations.addBoard(
            new BoardCreate({
              title,
              labels,
              color,
            })
          )
        );

        handleClose();
      }}
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

          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <PaletteIcon color="primary" fontSize="large" />

            <Autocomplete
              fullWidth
              disablePortal
              id="combo-box-demo"
              options={colors}
              getOptionLabel={(option) => option.label}
              onChange={(_, selectedValues) => {
                setFieldValue("color", selectedValues.color);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Set Color Of Border" />
              )}
              renderOption={(props, option) => (
                <Box
                  {...props}
                  sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <Box
                    sx={{
                      width: "2rem",
                      height: "1rem",
                      backgroundColor: option.color,
                    }}
                  ></Box>
                  <Typography>{option.label}</Typography>
                </Box>
              )}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <IconButton type="submit">
              <DoneIcon />
            </IconButton>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};
