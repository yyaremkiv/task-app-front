import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TaskBoard } from "./pages/Taskboard";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { AuthPage } from "./pages/Auth";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PublicRoute } from "./components/PublicRoute";
import { LoginForm } from "./components/Login";
import { RegisterForm } from "./components/Register";
import { PrivateRoute } from "./components/PrivateRoute";
import { Layout } from "./pages/Layout";
import { PageAuth } from "./pages/PageAuth";
import { FormLogin } from "./components/FormLogin";
import { FormRegister } from "./components/FormRegister";

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
        <Routes>
          <Route path="/" element={<Layout setMode={setMode} mode={mode} />}>
            <Route
              path="/"
              element={
                <PublicRoute redirectTo="/home" component={<PageAuth />} />
              }
            >
              <Route path="/" element={<FormLogin />} />
              <Route path="register" element={<FormRegister />} />
            </Route>

            <Route
              path="/"
              element={
                <PrivateRoute redirectTo="/auth" component={<TaskBoard />} />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
