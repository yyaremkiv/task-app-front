export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#E6FBFF",
    100: "#CCF7FE",
    200: "#99EEFD",
    300: "#66E6FC",
    400: "#33DDFB",
    500: "#00D5FA",
    600: "#00A0BC",
    700: "#006B7D",
    800: "#00353F",
    900: "#001519",
  },
};

export const themeSettings = (mode: any) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
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
            neutral: {
              light: "#00838f",
              dark: "#00838f",
            },
            background: {
              light: "#00838f",
              dark: "#00838f",
            },
            text: {
              light: "#00838f",
              dark: "#00838f",
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
              contrastText: "#000",
            },
            neutral: {
              light: "#00838f",
              dark: "#00838f",
            },
            background: {
              light: "#00838f",
              dark: "#00838f",
            },
            text: {
              light: "#00838f",
              dark: "#00838f",
            },
          }),
    },
  };
};
