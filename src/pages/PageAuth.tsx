import { Outlet } from "react-router-dom";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

export const PageAuth = (): JSX.Element => {
  const theme: Theme = useTheme();
  const matches: boolean = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      sx={{
        marginTop: "2rem",
        padding: "2rem",
        width: matches ? "70%" : "100%",
        backgroundColor: matches
          ? theme.palette.background.light
          : theme.palette.background.default,
        border: matches ? "1px solid gray" : "none",
        borderRadius: "1.5rem",
      }}
    >
      <Typography
        variant="h5"
        sx={{ marginBottom: "0.5rem", fontWeight: "500" }}
      >
        Welcome to your Task Manager!
      </Typography>
      <Outlet />
    </Box>
  );
};
