import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { FormConfig } from "../../config/form.config";
import { AppDispatch, RootState } from "../../redux/store";
import { CustomLoadingButton } from "../CustomLoadingButton";
import { CustomTextFieldFormik } from "../CustomTextFieldFormik";
import { CustomTextFieldPasswordFormik } from "../CustomTextFieldPasswordFormik";
import { Box, Typography, useTheme, Theme } from "@mui/material";
import AuthOperations from "../../redux/auth/AuthOperations";

export const FormLogin = (): JSX.Element => {
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const isErrorAuth = useSelector((state: RootState) => state.auth.error);
  const dispatch: AppDispatch = useDispatch();
  const theme: Theme = useTheme();

  return (
    <Box>
      <Formik
        onSubmit={(values) =>
          dispatch(
            AuthOperations.signin({
              email: values.email.toLocaleLowerCase(),
              password: values.password,
            })
          )
        }
        initialValues={FormConfig.initialValuesLogin}
        validationSchema={FormConfig.loginSchema}
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

            <CustomLoadingButton text="Login" isLoading={isLoading} />
          </form>
        )}
      </Formik>

      <Box>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              color: theme.palette.text.main,
              textDecoration: "none",
              "&:focus + &:hover": {
                cursor: "pointer",
                textDecoration: "underline",
              },
            }}
          >
            "Don't have an account? Sign Up here."
          </Typography>
        </Link>

        {isErrorAuth && (
          <Typography sx={{ textAlign: "right", color: "red" }}>
            {isErrorAuth}
          </Typography>
        )}

        <Typography mt="1rem" fontSize="0.85rem">
          User to test:
        </Typography>
        <Typography fontSize="0.85rem">email: tester@gmail.com</Typography>
        <Typography fontSize="0.85rem">password: tester123</Typography>
      </Box>
    </Box>
  );
};
