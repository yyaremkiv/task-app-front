import { TextField } from "@mui/material";

interface INumberFieldProp {
  label: string;
  name: string;
  minValue: number;
  maxValue: number;
  formikFunc: any;
  isLoading?: boolean;
}

export const CustomNumberField: React.FC<INumberFieldProp> = ({
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
