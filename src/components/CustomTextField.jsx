import { TextField } from "@mui/material";

export const CustomTextField = ({ label, name, formikFunc, isLoading }) => {
  return (
    <TextField
      label={label}
      name={name}
      onBlur={formikFunc.handleBlur}
      onChange={formikFunc.handleChange}
      value={formikFunc.values[name]}
      error={Boolean(formikFunc.touched[name] && formikFunc.errors[name])}
      helperText={formikFunc.touched[name] && formikFunc.errors[name]}
      disabled={isLoading}
    />
  );
};
