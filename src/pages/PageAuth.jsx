import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { Box, Typography, useMediaQuery } from "@mui/material";

export const PageAuth = () => {
  const isRegistred = useSelector((state) => state.auth.isRegistred);
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    if (isRegistred) navigate("/", { replace: true });
  }, [navigate, isRegistred]);

  return (
    <Box>
      <Box
        sx={{
          width: isNonMobileScreens ? "50%" : "93%",
          p: "2rem",
          m: "2rem auto",
          backgroundColor: "white",
          border: "1px solid gray",
          borderRadius: "1.5rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "0.5rem",
          }}
        >
          <Typography fontWeight="500" variant="h5" alignItems="center">
            Welcome to your Task Manager!
          </Typography>
        </Box>
        <Outlet />
      </Box>
    </Box>
  );
};
