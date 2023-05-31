import { Formik } from "formik";
import * as Yup from "yup";
import { Autocomplete, Box, IconButton, TextField } from "@mui/material";
import { Title, BookmarkBorder } from "@mui/icons-material/";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import TaskOperations from "../redux/task/taskOperations";
import BoardCreate from "../config/boardCreate";

const initialValuesBoard = {
  title: "",
  labels: [],
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

export const ModalBoardCreate = ({ handleClose }) => {
  const dispatch = useDispatch();
  const isLoading = false;

  return (
    <Formik
      onSubmit={(values) => {
        dispatch(
          TaskOperations.addBoard(
            new BoardCreate({ title: values.title, labels: values.labels })
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
