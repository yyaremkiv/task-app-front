import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { Box, Typography } from "@mui/material";
import { CustomAutocomplete } from "./CustomAutocomplete";
import { CustomTextField } from "./CustomTextField";
import { LoadingButton } from "@mui/lab";
import DataConfigInformation from "../data/DataConfigInformation";
import TaskOperations from "../redux/task/taskOperations";

const filterSchema = Yup.object().shape({
  query: Yup.string(),
});

export const FilterBoards = ({ page, limit, isLoading }) => {
  const dispatch = useDispatch();

  const initialValues = {
    query: "",
    labels: [],
    color: [],
  };

  const handleSubmitSearch = (values) => {
    const labels = values.labels;
    const color = " ";

    console.log("labels", labels);
    // dispatch(
    //   TaskOperations.getBoards({
    //     params: {
    //       query: values.query,
    //       labels,
    //       color,
    //       page,
    //       limit,
    //     },
    //   })
    // );
  };

  return (
    <Box sx={{ border: "1px solid green", padding: "1rem", width: "30%" }}>
      <Typography>Search by Board</Typography>
      <Formik
        onSubmit={handleSubmitSearch}
        initialValues={initialValues}
        validationSchema={filterSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <CustomTextField
              label="Search"
              name="query"
              formikFunc={{ values, errors, touched, handleBlur, handleChange }}
              isLoading={isLoading}
            />

            <CustomAutocomplete
              label="Set Labels"
              changeFieldName="labels"
              changeFieldFunction={setFieldValue}
              options={DataConfigInformation.labelCategories}
              isLoading={isLoading}
            />

            <CustomAutocomplete
              label="Set Color Of Borderd"
              changeFieldName="color"
              changeFieldFunction={setFieldValue}
              options={DataConfigInformation.colors}
              isLoading={isLoading}
            />

            <LoadingButton type="submit" variant="outlined" loading={isLoading}>
              Search Event
            </LoadingButton>
            <LoadingButton variant="outlined" loading={isLoading}>
              Clear Filter
            </LoadingButton>
          </form>
        )}
      </Formik>
    </Box>
  );
};
