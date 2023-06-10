import { Outlet } from "react-router-dom";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

export const PageAuth = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 800px)");
  const theme: Theme = useTheme();

  return (
    <Box
      sx={{
        marginTop: "2rem",
        padding: "2rem",
        width: isNonMobileScreens ? "50%" : "100%",
        backgroundColor: isNonMobileScreens
          ? theme.palette.background.light
          : theme.palette.background.default,
        border: isNonMobileScreens ? "1px solid gray" : "none",
        borderRadius: "1.5rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: "0.5rem", fontWeight: "500" }}
        >
          Welcome to your Task Manager!
        </Typography>
      </Box>
      <Outlet />
    </Box>
  );
};
