import React, { useState } from "react";
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";

import { Header } from "./components/Header";
import { TaskBoard } from "./pages/Taskboard";
import { Box, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { AuthPage } from "./pages/Auth";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PublicRoute } from "./components/PublicRoute";
import { LoginForm } from "./components/Login";
import { RegisterForm } from "./components/Register";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const theme = createTheme({
    palette: {
      mode: mode === "light" || mode === "dark" ? mode : "light",
      primary: {
        main: "#00838f",
        light: "#00acc1",
        dark: "#006064",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#ff3d00",
        dark: "#dd2c00",
        contrastText: "#000",
      },
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Box
          bgcolor={"background.default"}
          color={"text.primary"}
          minHeight="100vh"
          className="App"
          position="relative"
        >
          <Header setMode={setMode} mode={mode} />
          <Routes>
            <Route
              path="/auth"
              element={<PublicRoute redirectTo="/" component={<AuthPage />} />}
            >
              <Route path="/auth" element={<LoginForm />} />
              <Route path="/auth/register" element={<RegisterForm />} />
            </Route>

            <Route
              path="/"
              element={
                <PrivateRoute redirectTo="/auth" component={<TaskBoard />} />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
