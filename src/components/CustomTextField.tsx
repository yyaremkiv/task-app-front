import { TextField } from "@mui/material";

interface ITextFieldProp {
  label: string;
  name: string;
  formikFunc: any;
  isLoading?: boolean;
}

export const CustomTextField: React.FC<ITextFieldProp> = ({
  label,
  name,
  formikFunc,
  isLoading = false,
}) => {
  return (
    <TextField
      fullWidth
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
