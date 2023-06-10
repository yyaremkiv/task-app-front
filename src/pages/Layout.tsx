import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Box, Container } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

export const Layout = (): JSX.Element => {
  const theme: Theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          border: "1px solid green",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};
