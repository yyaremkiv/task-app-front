import { ILabelsArray } from "../interfaces/DataTypes";
import { Autocomplete, Box, Chip, TextField, Typography } from "@mui/material";

interface ICustomAutocompleteProps {
  label: string;
  options: Array<any>;
  changeFieldName: string;
  changeFieldFunction: (
    changeFieldName: string,
    selectedValues: ILabelsArray
  ) => void;
  value: any;
  isLoading?: boolean;
}

export const CustomAutocomplete: React.FC<ICustomAutocompleteProps> = ({
  label,
  options,
  changeFieldName,
  changeFieldFunction,
  value,
  isLoading = false,
}) => {
  return (
    <Autocomplete
      fullWidth
      multiple
      value={value}
      options={options}
      disabled={isLoading}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) =>
        option.label === value.label && option.color === value.color
      }
      onChange={(_, selectedValues) => {
        // @ts-ignore
        changeFieldFunction(changeFieldName, selectedValues);
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
      renderOption={(props, option) => (
        // @ts-ignore
        <Box
          component="div"
          {...props}
          sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
          <Box
            sx={{
              width: "2rem",
              height: "1.25rem",
              backgroundColor: option.color,
            }}
          ></Box>
          <Typography>{option.label}</Typography>
        </Box>
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            // @ts-ignore
            key={option.label}
            label={option.label}
            style={{
              color: "white",
              backgroundColor: option.color,
              marginRight: "5px",
            }}
            {...getTagProps({ index })}
          />
        ))
      }
    />
  );
};
