import { Autocomplete, Box, Chip, TextField, Typography } from "@mui/material";

export const CustomAutocompleteSingle = ({
  label,
  options,
  changeFieldName,
  changeFieldFunction,
  isLoading = false,
}) => {
  return (
    <Autocomplete
      fullWidth
      options={options}
      disabled={isLoading}
      getOptionLabel={(option) => option.label}
      onChange={(_, selectedValues) => {
        changeFieldFunction(changeFieldName, selectedValues);
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
      renderOption={(props, option) => (
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
