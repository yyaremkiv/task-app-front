import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";

export const FilterListOption = ({
  showFilter,
  showFilterFunc,
  view,
  viewChangeFunc,
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

      <ToggleButtonGroup
        orientation="horizontal"
        value={+view}
        exclusive
        onChange={(_, value) => viewChangeFunc(value)}
      >
        <ToggleButton value={6}>
          <LooksTwoIcon />
        </ToggleButton>
        <ToggleButton value={4}>
          <Looks3Icon />
        </ToggleButton>
        <ToggleButton value={3}>
          <Looks4Icon />
        </ToggleButton>
      </ToggleButtonGroup>

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
