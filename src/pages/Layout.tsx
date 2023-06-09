import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Box } from "@mui/material";

export const Layout = () => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        color: "text.primary",
        bgcolor: "background.default",
      }}
    >
      <Header />
      <Outlet />
    </Box>
  );
};
