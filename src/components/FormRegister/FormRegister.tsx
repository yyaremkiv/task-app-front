import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FormConfig } from "../../config/form.config";
import { RootState, AppDispatch } from "../../redux/store";
import { ISignupArg } from "../../Interfaces/dataTypes";
import { Formik } from "formik";
import { Box, TextField, Typography, useTheme } from "@mui/material";
import { FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import AuthOperations from "../../redux/auth/AuthOperations";

export const FormRegister: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const isErrorAuth = useSelector((state: RootState) => state.auth.error);
  const dispatch: AppDispatch = useDispatch();
  const { palette } = useTheme();

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
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <TextField
              label="User Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
              name="username"
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
              sx={{ height: "60px" }}
            />

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              sx={{ height: "60px" }}
            />

            <FormControl sx={{ gridColumn: "span 4" }} variant="outlined">
              <InputLabel
                htmlFor="outlined-adornment-password"
                error={Boolean(touched.password && errors.password)}
              >
                Password
              </InputLabel>
              <OutlinedInput
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.password && errors.password)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                error={Boolean(touched.password && errors.password)}
                sx={{
                  visibility:
                    touched.password && errors.password ? "visible" : "hidden",
                  height: "12px",
                }}
              >
                {errors.password}
              </FormHelperText>
            </FormControl>

            <LoadingButton
              variant="contained"
              loading={isLoading}
              disabled={isLoading}
              loadingPosition="center"
              type="submit"
              sx={{
                margin: "0 auto 1rem auto",
                padding: "0.25rem 4rem",
                fontSize: "0.9rem",
                color: "#fff",
              }}
            >
              REGISTER
            </LoadingButton>
          </form>
        )}
      </Formik>

      <Box>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              marginBottom: "0.25rem",
              color: palette.primary.main,
              "&:hover": {
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
