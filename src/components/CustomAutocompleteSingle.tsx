import { Autocomplete, Box, Chip, TextField, Typography } from "@mui/material";

interface IColorItem {
  label: string;
  color: string;
}

interface ICustomAutocompleteProp {
  label: string;
  options: IColorItem[];
  value: any;
  changeFieldName: string;
  changeFieldFunction: (changeFieldName: string, selectedValues: any) => void;
  isLoading?: boolean;
}

export const CustomAutocompleteSingle: React.FC<ICustomAutocompleteProp> = ({
  label,
  options,
  value,
  changeFieldName,
  changeFieldFunction,
  isLoading = false,
}) => {
  console.log("this is console", options);
  return (
    <Autocomplete
      fullWidth
      options={options}
      disabled={isLoading}
      value={value}
      getOptionLabel={(option) => option.label}
      onChange={(_, selectedValues) => {
        changeFieldFunction(changeFieldName, selectedValues);
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
      renderOption={(props, option) => (
        //@ts-ignore
        <Box
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
            //@ts-ignore
            key={index}
            label={option.label}
            style={{
              color: "white",
              backgroundColor: option.color,
              marginRight: "5px",
            }}
            {...getTagProps({ index })}
            onDelete={() => {
              changeFieldFunction(changeFieldName, null);
            }}
          />
        ))
      }
    />
  );
};
