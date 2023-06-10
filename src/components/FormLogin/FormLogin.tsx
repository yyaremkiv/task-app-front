import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { FormConfig } from "../../config/form.config";
import { TextField } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import AuthOperations from "../../redux/auth/AuthOperations";

export const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector((state: any) => state.auth.isLoading);
  const isErrorAuth = useSelector((state: any) => state.auth.error);
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Box>
      <Formik
        // @ts-ignore
        onSubmit={(values) =>
          dispatch(
            // @ts-ignore
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
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              disabled={isLoading}
              style={{ height: "60px" }}
            />

            <FormControl variant="outlined">
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
                disabled={isLoading}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
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
                backgroundColor: theme.palette.background.main,
                "&:hover": {
                  backgroundColor: theme.palette.background.mainHover,
                },
              }}
            >
              <span>LOGIN</span>
            </LoadingButton>
          </form>
        )}
      </Formik>

      <Box>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              textDecoration: "none",
              color: theme.palette.text.main,
              "&:hover": {
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
