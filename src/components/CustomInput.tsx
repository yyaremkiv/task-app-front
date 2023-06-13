import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { ChangeButtons } from "./ChangeButtons";
import { CustomTextFieldFormik } from "./CustomTextFieldFormik";
import { LoadingButton } from "@mui/lab";
import { Paper, Box } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import { Title } from "@mui/icons-material/";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { CircularProgress, IconButton } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

interface CustomInputProps {
  text: string;
  placeholder: string;
  onClickAddBtn: (value: string) => void;
  isLoading?: boolean;
}

const cardSchema = Yup.object().shape({
  title: Yup.string()
    .min(6, "Title must be at least 6 characters long.")
    .max(40, "Title cannot be longer than 40 characters.")
    .required("Title is required."),
});

export const CustomInput: React.FC<CustomInputProps> = ({
  text,
  placeholder,
  onClickAddBtn,
  isLoading = false,
}) => {
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const theme: Theme = useTheme();

  const getTitleBoard = (e: any) => {
    e.preventDefault();

    if (inputText && onClickAddBtn) {
      onClickAddBtn(inputText);
      setInputText("");
    }
    setShowCustomInput(false);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {showCustomInput ? (
        <Formik
          onSubmit={(values) => console.log("values", values)}
          initialValues={{ title: "" }}
          validationSchema={cardSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                  padding: "0.75rem",
                }}
              >
                <Title color="primary" fontSize="large" />
                <Box sx={{ maxWidth: "60%" }}>
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
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                    padding: "0.25rem",
                  }}
                >
                  <IconButton type="submit">
                    {isLoading ? (
                      <CircularProgress size={25} />
                    ) : (
                      <DoneIcon sx={{ color: "green" }} />
                    )}
                  </IconButton>
                  <IconButton onClick={() => setShowCustomInput(false)}>
                    <CloseIcon sx={{ color: isLoading ? null : "red" }} />
                  </IconButton>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      ) : (
        <Box sx={{ padding: "0.5rem" }}>
          <LoadingButton
            variant="contained"
            loadingPosition="start"
            startIcon={<AddBoxIcon />}
            loading={isLoading}
            onClick={() => setShowCustomInput(true)}
            sx={{
              textTransform: "none",
              backgroundColor: theme.palette.background.main,
              "&:hover": {
                backgroundColor: theme.palette.background.mainHover,
              },
            }}
          >
            Add New Card
          </LoadingButton>
        </Box>
      )}
    </Box>
  );
};
