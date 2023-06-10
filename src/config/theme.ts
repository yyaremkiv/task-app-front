import { PaletteColor, PaletteMode, TypeBackground } from "@mui/material";

declare module "@mui/material" {
  interface TypeBackground {
    light: string;
  }
}

export const themeSettings = (mode: PaletteMode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: "#00838f",
              light: "#00acc1",
              dark: "#006064",
            },
            secondary: {
              light: "#ff7961",
              main: "#ff3d00",
              dark: "#dd2c00",
            },
            background: {
              default: "#121212",
              paper: "#121212",
              light: "#212121",
              main: "#26a69a",
              mainHover: "#00796b",
            },
            text: {
              primary: "#fff",
              light: "#fff",
              main: "#26a69a",
            },
          }
        : {
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
            },
            background: {
              default: "#fff",
              paper: "#fff",
              light: "#fafafa",
              main: "#26a69a",
              mainHover: "#00796b",
            },
            text: {
              primary: "rgba(0, 0, 0, 0.87)",
              light: "#fff",
              main: "#26a69a",
            },
          }),
    },
  };
};
