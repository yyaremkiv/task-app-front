import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { ILabelItemSingle, ILabelsArray } from "../../Interfaces/DataTypes";
import { AppDispatch } from "../../redux/store";
import { IParamsTask } from "../../redux/task/taskOperations";
import { CustomAutocomplete } from "../CustomAutocomplete";
import { CustomTextField } from "../CustomTextField";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import TaskOperations from "../../redux/task/taskOperations";
import DataConfigInformation from "../../data/DataConfigInformation";

interface IInitialValues {
  query: string;
  labels: [] | ILabelsArray;
  colors: [] | ILabelItemSingle[];
}

const initialValues: IInitialValues = {
  query: "",
  labels: [],
  colors: [],
};

const filterSchema = Yup.object().shape({
  query: Yup.string()
    .max(40, "Query cannot be longer than 40 characters.")
    .test(
      "isEmpty",
      "Select at least one parameter to search",
      function (value) {
        const { labels, colors } = this.parent;
        return value !== undefined || labels.length > 0 || colors.length > 0;
      }
    ),
  labels: Yup.array(),
  colors: Yup.array(),
});

interface IFilterBoardsProp {
  page: number;
  limit: number;
  isLoading?: boolean;
}

interface IHandleSubmitSearch {
  query: string;
  labels: [] | ILabelsArray;
  colors: [] | ILabelItemSingle[];
}

export const FilterBoards: React.FC<IFilterBoardsProp> = ({
  page = 1,
  limit = 10,
  isLoading = false,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const handleSubmitSearch = ({
    query,
    labels,
    colors,
  }: IHandleSubmitSearch) => {
    const params: IParamsTask["params"] = { page, limit };

    if (query.trim()) params.query = query.trim();
    if (Array.isArray(labels) && labels.length > 0)
      params.labels = labels
        .map((item: ILabelItemSingle) => item.label)
        .join(",");
    if (colors.length > 0)
      params.colors = colors.map((item) => item.color).join(",");

    console.log("params", params);

    dispatch(TaskOperations.getBoards({ params }));
  };

  const handleClearFilter = (resetForm: () => void, values: IInitialValues) => {
    resetForm();

    if (JSON.stringify(initialValues) === JSON.stringify(values)) return;
    dispatch(TaskOperations.getBoards({ params: { page, limit } }));
  };

  return (
    <Box sx={{ padding: "0.5rem" }}>
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
              gap: "0.75rem",
            }}
          >
            <CustomTextField
              label="Search In Title"
              name="query"
              formikFunc={{ values, errors, touched, handleBlur, handleChange }}
              isLoading={isLoading}
            />

            <CustomAutocomplete
              label="Set Labels of Board"
              changeFieldName="labels"
              value={values.labels}
              changeFieldFunction={setFieldValue}
              options={DataConfigInformation.labelCategories}
              isLoading={isLoading}
            />

            <CustomAutocomplete
              label="Set Color Of Board"
              changeFieldName="colors"
              value={values.colors}
              changeFieldFunction={setFieldValue}
              options={DataConfigInformation.colors}
              isLoading={isLoading}
            />

            <LoadingButton type="submit" variant="outlined" loading={isLoading}>
              Search Boards
            </LoadingButton>
            <LoadingButton
              variant="outlined"
              loading={isLoading}
              onClick={() => handleClearFilter(resetForm, values)}
            >
              Clear Filter
            </LoadingButton>
          </form>
        )}
      </Formik>
    </Box>
  );
};
