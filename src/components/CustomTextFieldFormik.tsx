import { TextField } from "@mui/material";

interface ITextFieldProps {
  label: string;
  name: string;
  formikFunc: any;
  isLoading?: boolean;
}

export const CustomTextFieldFormik = ({
  label,
  name,
  formikFunc: { values, errors, touched, handleBlur, handleChange },
  isLoading = false,
}: ITextFieldProps): JSX.Element => {
  return (
    <TextField
      fullWidth
      multiline
      label={label}
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
      value={values[name]}
      error={Boolean(touched[name] && errors[name])}
      helperText={touched[name] && errors[name]}
      disabled={isLoading}
    />
  );
};
