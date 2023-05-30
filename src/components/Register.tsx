import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  Typography,
  ImageListItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { Visibility, VisibilityOff } from "@mui/icons-material/";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { ItemCardInfo } from "./styles";
// import todolist from "../../image/todolist.jpeg";

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e: any) => {
    e.preventDefault();
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .matches(/^[A-Za-zА-Яа-я]+$/, "Only letters are allowed")
      .min(2, "Too short!")
      .max(15, "Must be 15 characters or less")
      .required("Required"),

    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .max(20, "Must be 20 characters or less")
      .min(8, "Password should be a minimum 8 characters length")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: { userName: "", email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      async function fetchAuth() {
        try {
          setError(null);
          setLoading(true);
          const { data } = await AuthService.register({
            userName: values.firstName,
            email: values.email,
            password: values.password,
          });

          localStorage.setItem("token", data.token);
          navigate("/");
          setLoading(false);
        } catch (e: any) {
          setLoading(false);
          setError(e?.response?.data?.message || "Your network error");
        }
      }

      fetchAuth();
    },
  });

  return (
    <Box
      sx={{
        paddingTop: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        autoComplete="off"
        style={{
          maxWidth: "500px",
        }}
      >
        <ItemCardInfo elevation={4} sx={{ padding: "50px 30px" }}>
          <Typography
            variant="h5"
            component="h5"
            sx={{ flexGrow: 1, padding: "20px" }}
          >
            Create an Account
          </Typography>

          <ImageListItem
            sx={{
              borderRadius: "10px",
              overflow: "hidden",
              maxWidth: "400px",
              margin: "0 auto",
              marginBottom: "20px",
            }}
          >
            {/* <img
              src={todolist}
              alt="Screen Saver"
              sx={{ height: "100%", weight: "auto" }}
            /> */}
          </ImageListItem>
          <TextField
            sx={{ paddingBottom: "20px" }}
            fullWidth
            id="userName"
            name="userName"
            label="User Name"
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
            autoComplete="off"
          />
          <TextField
            sx={{ paddingBottom: "20px" }}
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            autoComplete="off"
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              // helperText={formik.touched.password && formik.errors.password}
              autoComplete="off"
              sx={{ marginBottom: "20px", backgroundColor: "inherit" }}
            />
          </FormControl>

          <LoadingButton
            color="primary"
            variant="contained"
            type="submit"
            loading={loading}
            endIcon={<SendIcon />}
            loadingPosition="end"
            sx={{ padding: "12px 30px", margin: "0 auto" }}
          >
            <span>Submit</span>
          </LoadingButton>

          <Typography
            variant="subtitle1"
            component="p"
            width="100%"
            sx={{ flexGrow: 1, padding: "20px" }}
          >
            Have already an account?{" "}
            <Link to="/auth" style={{ color: "#00838f" }}>
              Log in
            </Link>
          </Typography>

          {error ? (
            <Typography
              variant="subtitle1"
              component="p"
              color="error"
              sx={{ flexGrow: 1, padding: "20px" }}
            >
              {error}
            </Typography>
          ) : null}
        </ItemCardInfo>
      </form>
    </Box>
  );
};
