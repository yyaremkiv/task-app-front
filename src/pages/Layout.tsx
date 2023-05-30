import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Box } from "@mui/material";

export const Layout = ({ setMode, mode }: { setMode: any; mode: any }) => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        color: "text.primary",
        bgcolor: "background.default",
      }}
    >
      <Header setMode={setMode} mode={mode} />
      <Outlet />
    </Box>
  );
};
