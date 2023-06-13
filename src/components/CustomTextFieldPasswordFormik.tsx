import { useState } from "react";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface ICustomTextFieldPasswordFormik {
  label: string;
  name: string;
  formikFunc: any;
  isLoading?: boolean;
}

export const CustomTextFieldPasswordFormik = ({
  label,
  name,
  formikFunc: { values, errors, touched, handleBlur, handleChange },
  isLoading = false,
}: ICustomTextFieldPasswordFormik): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <FormControl variant="outlined">
      <InputLabel
        htmlFor="outlined-adornment-password"
        error={Boolean(touched.password && errors.password)}
      >
        Password
      </InputLabel>
      <OutlinedInput
        label={label}
        name={name}
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
  );
};
