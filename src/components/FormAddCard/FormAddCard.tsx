import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { CustomTextField } from "../CustomTextField";
import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import { Title } from "@mui/icons-material/";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

interface IFormAddCardProps {
  boardId: string;
  handleAddCard: (data: { boardId: string; titleCard: string }) => void;
  isLoading?: boolean;
}

const cardSchema = Yup.object().shape({
  title: Yup.string()
    .min(4, "Title must be at least 4 characters long.")
    .max(40, "Title cannot be longer than 40 characters.")
    .required("Title is required."),
});

export const FormAddCard: React.FC<IFormAddCardProps> = ({
  boardId,
  handleAddCard,
  isLoading = false,
}) => {
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
  const theme: Theme = useTheme();

  const handleSubmitFunc = (values: { title: string }) => {
    handleAddCard({ boardId, titleCard: values.title });
    setShowCustomInput(false);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {showCustomInput ? (
        <Formik
          onSubmit={handleSubmitFunc}
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
                  <CustomTextField
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
