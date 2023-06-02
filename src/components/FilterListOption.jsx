import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";

export const FilterListOption = ({
  showFilter,
  showFilterFunc,
  limit,
  changeLimit,
  shown,
  total,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <IconButton onClick={() => showFilterFunc(!showFilter)}>
        {showFilter ? <FilterListOffIcon /> : <FilterListIcon />}
      </IconButton>
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Typography>All Boards: {total}</Typography>
        <Typography>Display: {shown}</Typography>
        <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
          <InputLabel id="demo-select-small-label">Count</InputLabel>
          <Select
            label="Count"
            id="demo-select-small"
            value={limit}
            onChange={(e) => changeLimit(e.target.value)}
          >
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
