import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageTask } from "./pages/PageTask";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PublicRoute } from "./components/PublicRoute";
import { PrivateRoute } from "./components/PrivateRoute";
import { Layout } from "./pages/Layout";
import { PageAuth } from "./pages/PageAuth";
import { FormLogin } from "./components/FormLogin/FormLogin";
import { FormRegister } from "./components/FormRegister/FormRegister";
import { themeSettings } from "./config/theme";

function App() {
  const mode = useSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Layout mode={mode} />}>
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
              path="/home"
              element={<PrivateRoute redirectTo="/" component={<PageTask />} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
