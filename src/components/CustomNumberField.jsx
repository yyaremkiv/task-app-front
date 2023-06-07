import { TextField } from "@mui/material";

export const CustomNumberField = ({
  label,
  name,
  minValue,
  maxValue,
  formikFunc,
  isLoading = false,
}) => {
  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      type="number"
      onBlur={formikFunc.handleBlur}
      onChange={formikFunc.handleChange}
      value={formikFunc.values[name]}
      error={Boolean(formikFunc.touched[name] && formikFunc.errors[name])}
      helperText={formikFunc.touched[name] && formikFunc.errors[name]}
      disabled={isLoading}
      inputProps={{
        min: minValue,
        max: maxValue,
      }}
    />
  );
};
