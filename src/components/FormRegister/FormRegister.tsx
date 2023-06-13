import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { FormConfig } from "../../config/form.config";
import { CustomTextFieldFormik } from "../CustomTextFieldFormik";
import { CustomTextFieldPasswordFormik } from "../CustomTextFieldPasswordFormik";
import { CustomLoadingButton } from "../CustomLoadingButton";
import { RootState, AppDispatch } from "../../redux/store";
import { ISignupArg } from "../../Interfaces/DataTypes";
import { Box, Typography, useTheme, Theme } from "@mui/material";
import AuthOperations from "../../redux/auth/AuthOperations";

export const FormRegister = (): JSX.Element => {
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const isErrorAuth = useSelector((state: RootState) => state.auth.error);
  const dispatch: AppDispatch = useDispatch();
  const theme: Theme = useTheme();

  const handleFormSubmit = ({ username, email, password }: ISignupArg) => {
    dispatch(AuthOperations.signup({ username, email, password }));
  };

  return (
    <Box>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={FormConfig.initialValuesRegister}
        validationSchema={FormConfig.registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <CustomTextFieldFormik
              label="User Name"
              name="username"
              formikFunc={{ values, errors, touched, handleBlur, handleChange }}
              isLoading={isLoading}
            />

            <CustomTextFieldFormik
              label="Email"
              name="email"
              formikFunc={{ values, errors, touched, handleBlur, handleChange }}
              isLoading={isLoading}
            />

            <CustomTextFieldPasswordFormik
              label="Password"
              name="password"
              formikFunc={{ values, errors, touched, handleBlur, handleChange }}
              isLoading={isLoading}
            />

            <CustomLoadingButton text="Register" isLoading={isLoading} />
          </form>
        )}
      </Formik>

      <Box>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              marginBottom: "0.25rem",
              color: theme.palette.primary.main,
              "&:focus + &:hover": {
                cursor: "pointer",
                textDecoration: "underline",
              },
            }}
          >
            "Already have an account? Login here."
          </Typography>
        </Link>
        {isErrorAuth && (
          <Typography sx={{ textAlign: "right", color: "red" }}>
            {isErrorAuth}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
