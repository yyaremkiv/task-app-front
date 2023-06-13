import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Box, Container, useTheme, Theme } from "@mui/material";

export const Layout = (): JSX.Element => {
  const theme: Theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Header />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          maxWidth: theme.breakpoints.values.xl,
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};
